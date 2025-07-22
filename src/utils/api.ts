// API utilities for HariHar Pathshala - एक पेड़ माँ के नाम 2.0
import { Alert } from 'react-native';

// Base API Configuration
const API_BASE_URL = 'https://grx6djfl-5003.inc1.devtunnels.ms/api/v1';

// Fast mode - use mock data if API is slow (for demo)
const FAST_MODE = false; // Set to false when real API is ready

// Valid credentials for testing (remove when backend is ready)
const VALID_TEACHER_CREDENTIALS = [
  { udiseCode: '123', teacherName: 'teacher', password: '123' },
  { udiseCode: '456', teacherName: 'admin', password: '456' },
];

const VALID_CRC_CREDENTIALS = [
  { username: 'crc', phoneNumber: '1234567890', password: '123' },
  { username: 'admin', phoneNumber: '0987654321', password: '456' },
];

// Valid credentials database (Replace with backend data when available)
const VALID_TEACHERS = [
  {
    udiseCode: '08010100101',
    teacherName: 'Radha Sharma',
    password: 'teacher123',
    schoolName: 'Rajkiya Prathamik Shala, Gandhinagar'
  },
  {
    udiseCode: '08010100102',
    teacherName: 'Sunita Verma',
    password: 'teacher456',
    schoolName: 'Saraswati Vidya Mandir'
  },
  {
    udiseCode: '08010100103',
    teacherName: 'Ajay Kumar',
    password: 'teacher789',
    schoolName: 'Gandhi Prathamik Shala'
  },
  // Add more valid teachers as needed
];

const VALID_CRC_USERS = [
  {
    username: 'supervisor1',
    phoneNumber: '9876543210',
    password: 'crc123',
    district: 'Jaipur'
  },
  {
    username: 'supervisor2', 
    phoneNumber: '9876543211',
    password: 'crc456',
    district: 'Udaipur'
  },
  {
    username: 'admin',
    phoneNumber: '9876543212',
    password: 'admin123',
    district: 'Rajasthan'
  },
  // Add more valid CRC users as needed
];

// API endpoints
const ENDPOINTS = {
  // Authentication
  TEACHER_LOGIN: '/auth/teacher/login',
  CRC_LOGIN: '/auth/crc/login',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Student Management
  STUDENTS: '/students',
  STUDENT_BY_ID: '/students/:id',
  STUDENTS_BY_SCHOOL: '/students/school/:udiseCode',
  
  // Photo Upload
  UPLOAD_PHOTO: '/photos/upload',
  PHOTO_VERIFICATION: '/photos/verify',
  PHOTOS_BY_STUDENT: '/photos/student/:studentId',
  
  // Certificate Management
  GENERATE_CERTIFICATE: '/certificates/generate',
  CERTIFICATE_STATUS: '/certificates/status/:studentId',
  DOWNLOAD_CERTIFICATE: '/certificates/download/:certificateId',
  
  // School Monitoring
  SCHOOL_STATS: '/schools/:udiseCode/stats',
  ALL_SCHOOLS_STATS: '/schools/stats',
  TEACHER_REPORTS: '/reports/teachers',
  
  // Data Verification (CRC)
  PENDING_VERIFICATIONS: '/verifications/pending',
  VERIFY_DATA: '/verifications/verify/:id',
  REJECT_DATA: '/verifications/reject/:id',
  
  // Progress Tracking
  DISTRICT_PROGRESS: '/progress/district',
  SCHOOL_PROGRESS: '/progress/school/:udiseCode',
};

// Type definitions
export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    role: 'teacher' | 'crc';
    udiseCode?: string;
    district?: string;
  };
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  udiseCode: string;
  pedStatus: 'uploaded' | 'not-uploaded';
  certificateStatus: 'generated' | 'not-generated';
  uploadDate?: string;
  photoUrl?: string;
}

export interface PhotoUploadData {
  studentId: string;
  treeName: string;
  photoBase64: string;
  evoCertificate?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface SchoolStats {
  udiseCode: string;
  schoolName: string;
  totalStudents: number;
  photosUploaded: number;
  certificatesGenerated: number;
  uploadPercentage: number;
  lastActivity?: string;
}

export interface VerificationItem {
  id: string;
  teacherName: string;
  schoolName: string;
  studentId: string;
  studentName: string;
  photoUrl: string;
  treeName: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'rejected';
  reason?: string;
}

// HTTP client with error handling
class APIClient {
  private token: string | null = null;
  private refreshToken: string | null = null;

  setTokens(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // In fast mode, throw timeout error quickly to use mock data
    if (FAST_MODE) {
      console.log('Fast mode enabled - using shorter timeout');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout in fast mode
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      } catch (error: any) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
          console.log('Fast mode timeout - using mock data');
          throw new Error('TIMEOUT');
        }
        
        console.error('API Request failed:', error);
        throw error;
      }
    }
    
    // Normal mode with longer timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401 && this.refreshToken) {
          // Try to refresh token with shorter timeout
          await this.refreshTokens();
          // Retry original request
          headers.Authorization = `Bearer ${this.token}`;
          
          const retryController = new AbortController();
          const retryTimeoutId = setTimeout(() => retryController.abort(), 3000); // 3 second timeout for retry
          
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            signal: retryController.signal,
          });
          
          clearTimeout(retryTimeoutId);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          
          return retryResponse.json();
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.log('Request timeout, using mock data');
        throw new Error('TIMEOUT');
      }
      
      console.error('API Request failed:', error);
      throw error;
    }
  }

  private async refreshTokens(): Promise<void> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout for token refresh
      
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        this.refreshToken = data.refreshToken;
      } else {
        this.clearTokens();
        throw new Error('Token refresh failed');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Token refresh timeout');
      }
      this.clearTokens();
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Upload file with multipart/form-data
  async uploadFile<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

// Create API client instance
const apiClient = new APIClient();

// Credential validation functions
const validateTeacherCredentials = (udiseCode: string, teacherName: string, password: string) => {
  return VALID_TEACHERS.find(teacher => 
    teacher.udiseCode === udiseCode && 
    teacher.teacherName === teacherName && 
    teacher.password === password
  );
};

// Authentication APIs
export const authAPI = {
  // Teacher login
  teacherLogin: async (
    udiseCode: string,
    teacherName: string,
    password: string
  ): Promise<LoginResponse> => {
    console.log('Attempting teacher login for:', teacherName, 'at school:', udiseCode);
    
    // Check against valid credentials first (temporary until backend is ready)
    const isValidCredentials = VALID_TEACHER_CREDENTIALS.some(cred => 
      cred.udiseCode === udiseCode && 
      cred.teacherName === teacherName && 
      cred.password === password
    );

    if (isValidCredentials) {
      console.log('Valid credentials found - login successful');
      const successResponse: LoginResponse = {
        success: true,
        token: 'valid-teacher-token-' + Date.now(),
        refreshToken: 'valid-refresh-token-' + Date.now(),
        user: {
          id: 'teacher-' + udiseCode,
          name: teacherName,
          role: 'teacher',
          udiseCode,
        },
      };
      apiClient.setTokens(successResponse.token, successResponse.refreshToken);
      return successResponse;
    }

    // Invalid credentials - try backend call (will likely fail but good for future)
    try {
      console.log('Calling backend API for validation...');
      const response = await apiClient.post<LoginResponse>(ENDPOINTS.TEACHER_LOGIN, {
        udiseCode,
        teacherName,
        password,
      });
      
      console.log('Backend response:', response);
      
      if (response.success) {
        console.log('Backend login successful');
        apiClient.setTokens(response.token, response.refreshToken);
        return response;
      }
    } catch (error: any) {
      console.log('Backend API call failed:', error.message);
    }

    // Invalid credentials - login failed
    console.log('Login failed - invalid credentials');
    return {
      success: false,
      token: '',
      refreshToken: '',
      user: {
        id: '',
        name: '',
        role: 'teacher',
      },
    };
  },

  // CRC/Supervisor login
  crcLogin: async (
    username: string,
    phoneNumber: string,
    password: string
  ): Promise<LoginResponse> => {
    console.log('Attempting CRC login for:', username, 'phone:', phoneNumber);
    
    // Check against valid credentials first (temporary until backend is ready)
    const isValidCredentials = VALID_CRC_CREDENTIALS.some(cred => 
      cred.username === username && 
      cred.phoneNumber === phoneNumber && 
      cred.password === password
    );

    if (!isValidCredentials) {
      console.log('Invalid credentials - CRC not found in database');
      return {
        success: false,
        token: '',
        refreshToken: '',
        user: {
          id: '',
          name: '',
          role: 'crc',
        },
      };
    }
    
    console.log('Valid credentials found for CRC:', username);
    
    // Return successful login with validated local data
    const successResponse: LoginResponse = {
      success: true,
      token: 'valid-crc-token-' + Date.now(),
      refreshToken: 'valid-refresh-token-' + Date.now(),
      user: {
        id: 'crc-' + username,
        name: username,
        role: 'crc',
        district: 'Rajasthan',
      },
    };
    
    apiClient.setTokens(successResponse.token, successResponse.refreshToken);
    return successResponse;
  },

  // Logout
  logout: () => {
    apiClient.clearTokens();
  },
};

// Student Management APIs
export const studentAPI = {
  // Get all students for a school
  getStudentsBySchool: async (udiseCode: string): Promise<Student[]> => {
    try {
      const endpoint = ENDPOINTS.STUDENTS_BY_SCHOOL.replace(':udiseCode', udiseCode);
      return await apiClient.get<Student[]>(endpoint);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          name: 'अमन शर्मा',
          rollNumber: 'R001',
          udiseCode,
          pedStatus: 'uploaded',
          certificateStatus: 'generated',
          uploadDate: '2024-12-15',
        },
        {
          id: '2',
          name: 'प्रिया गुप्ता',
          rollNumber: 'R002',
          udiseCode,
          pedStatus: 'uploaded',
          certificateStatus: 'generated',
          uploadDate: '2024-12-14',
        },
        // Add more mock students as needed
      ];
    }
  },

  // Get student by ID
  getStudentById: async (studentId: string): Promise<Student> => {
    try {
      const endpoint = ENDPOINTS.STUDENT_BY_ID.replace(':id', studentId);
      return await apiClient.get<Student>(endpoint);
    } catch (error) {
      console.error('Failed to fetch student:', error);
      throw error;
    }
  },

  // Add new student
  addStudent: async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    try {
      return await apiClient.post<Student>(ENDPOINTS.STUDENTS, studentData);
    } catch (error) {
      console.error('Failed to add student:', error);
      throw error;
    }
  },

  // Update student
  updateStudent: async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
    try {
      const endpoint = ENDPOINTS.STUDENT_BY_ID.replace(':id', studentId);
      return await apiClient.put<Student>(endpoint, studentData);
    } catch (error) {
      console.error('Failed to update student:', error);
      throw error;
    }
  },
};

// Photo Upload APIs
export const photoAPI = {
  // Upload photo
  uploadPhoto: async (photoData: PhotoUploadData): Promise<{ success: boolean; photoId: string }> => {
    try {
      const formData = new FormData();
      formData.append('studentId', photoData.studentId);
      formData.append('treeName', photoData.treeName);
      
      // Create proper file object for React Native
      const photoFile = {
        uri: `data:image/jpeg;base64,${photoData.photoBase64}`,
        type: 'image/jpeg',
        name: `student_${photoData.studentId}_tree.jpg`,
      };
      
      formData.append('photo', photoFile as any);
      
      if (photoData.evoCertificate) {
        formData.append('evoCertificate', photoData.evoCertificate);
      }
      
      if (photoData.location) {
        formData.append('location', JSON.stringify(photoData.location));
      }

      const response = await apiClient.uploadFile<{ success: boolean; photoId: string }>(
        ENDPOINTS.UPLOAD_PHOTO,
        formData
      );
      
      return response;
    } catch (error) {
      console.error('Photo upload failed:', error);
      // Return mock success for demo
      return {
        success: true,
        photoId: 'photo-' + Date.now(),
      };
    }
  },

  // Get photos by student
  getPhotosByStudent: async (studentId: string): Promise<any[]> => {
    try {
      const endpoint = ENDPOINTS.PHOTOS_BY_STUDENT.replace(':studentId', studentId);
      return await apiClient.get<any[]>(endpoint);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      return [];
    }
  },
};

// Certificate APIs
export const certificateAPI = {
  // Generate certificate
  generateCertificate: async (studentId: string): Promise<{ success: boolean; certificateId: string }> => {
    try {
      return await apiClient.post<{ success: boolean; certificateId: string }>(
        ENDPOINTS.GENERATE_CERTIFICATE,
        { studentId }
      );
    } catch (error) {
      console.error('Certificate generation failed:', error);
      // Return mock success for demo
      return {
        success: true,
        certificateId: 'cert-' + Date.now(),
      };
    }
  },

  // Get certificate status
  getCertificateStatus: async (studentId: string): Promise<{ status: string; certificateId?: string }> => {
    try {
      const endpoint = ENDPOINTS.CERTIFICATE_STATUS.replace(':studentId', studentId);
      return await apiClient.get<{ status: string; certificateId?: string }>(endpoint);
    } catch (error) {
      console.error('Failed to get certificate status:', error);
      return { status: 'not-generated' };
    }
  },

  // Download certificate
  downloadCertificate: async (certificateId: string): Promise<string> => {
    try {
      const endpoint = ENDPOINTS.DOWNLOAD_CERTIFICATE.replace(':certificateId', certificateId);
      const response = await apiClient.get<{ downloadUrl: string }>(endpoint);
      return response.downloadUrl;
    } catch (error) {
      console.error('Failed to download certificate:', error);
      throw error;
    }
  },
};

// School Monitoring APIs
export const monitoringAPI = {
  // Get school statistics
  getSchoolStats: async (udiseCode: string): Promise<SchoolStats> => {
    try {
      const endpoint = ENDPOINTS.SCHOOL_STATS.replace(':udiseCode', udiseCode);
      return await apiClient.get<SchoolStats>(endpoint);
    } catch (error) {
      console.error('Failed to fetch school stats:', error);
      // Return mock data for demo
      return {
        udiseCode,
        schoolName: 'राजकीय प्राथमिक शाला',
        totalStudents: 150,
        photosUploaded: 87,
        certificatesGenerated: 65,
        uploadPercentage: 58,
        lastActivity: '2024-12-15',
      };
    }
  },

  // Get all schools statistics
  getAllSchoolsStats: async (): Promise<SchoolStats[]> => {
    try {
      return await apiClient.get<SchoolStats[]>(ENDPOINTS.ALL_SCHOOLS_STATS);
    } catch (error) {
      console.error('Failed to fetch all schools stats:', error);
      // Return mock data for demo
      return [
        {
          udiseCode: 'UD001',
          schoolName: 'राजकीय प्राथमिक शाला, रायपुर',
          totalStudents: 150,
          photosUploaded: 87,
          certificatesGenerated: 65,
          uploadPercentage: 58,
          lastActivity: '2024-12-15',
        },
        {
          udiseCode: 'UD002',
          schoolName: 'सरस्वती विद्या मंदिर',
          totalStudents: 120,
          photosUploaded: 45,
          certificatesGenerated: 32,
          uploadPercentage: 38,
          lastActivity: '2024-12-14',
        },
      ];
    }
  },

  // Get teacher reports
  getTeacherReports: async (): Promise<any[]> => {
    try {
      return await apiClient.get<any[]>(ENDPOINTS.TEACHER_REPORTS);
    } catch (error) {
      console.error('Failed to fetch teacher reports:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          name: 'राधा शर्मा जी',
          school: 'राजकीय प्राथमिक शाला',
          treesPlanted: 45,
          status: 'सक्रिय',
          lastReport: '2 दिन पहले',
        },
        {
          id: '2',
          name: 'सुनीता वर्मा जी',
          school: 'सरस्वती विद्या मंदिर',
          treesPlanted: 38,
          status: 'सक्रिय',
          lastReport: '1 दिन पहले',
        },
      ];
    }
  },
};

// Data Verification APIs (for CRC)
export const verificationAPI = {
  // Get pending verifications
  getPendingVerifications: async (): Promise<VerificationItem[]> => {
    try {
      return await apiClient.get<VerificationItem[]>(ENDPOINTS.PENDING_VERIFICATIONS);
    } catch (error) {
      console.error('Failed to fetch pending verifications:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          teacherName: 'राधा शर्मा जी',
          schoolName: 'राजकीय प्राथमिक शाला',
          studentId: '1',
          studentName: 'अमन शर्मा',
          photoUrl: 'https://example.com/photo1.jpg',
          treeName: 'नीम का पेड़',
          submittedDate: '2024-12-15',
          status: 'pending',
        },
        {
          id: '2',
          teacherName: 'अजय कुमार जी',
          schoolName: 'गांधी प्राथमिक शाला',
          studentId: '2',
          studentName: 'प्रिया गुप्ता',
          photoUrl: 'https://example.com/photo2.jpg',
          treeName: 'आम का पेड़',
          submittedDate: '2024-12-14',
          status: 'pending',
        },
      ];
    }
  },

  // Verify data
  verifyData: async (verificationId: string): Promise<{ success: boolean }> => {
    try {
      const endpoint = ENDPOINTS.VERIFY_DATA.replace(':id', verificationId);
      return await apiClient.post<{ success: boolean }>(endpoint);
    } catch (error) {
      console.error('Data verification failed:', error);
      // Return mock success for demo
      return { success: true };
    }
  },

  // Reject data
  rejectData: async (verificationId: string, reason: string): Promise<{ success: boolean }> => {
    try {
      const endpoint = ENDPOINTS.REJECT_DATA.replace(':id', verificationId);
      return await apiClient.post<{ success: boolean }>(endpoint, { reason });
    } catch (error) {
      console.error('Data rejection failed:', error);
      // Return mock success for demo
      return { success: true };
    }
  },
};

// Progress Tracking APIs
export const progressAPI = {
  // Get district progress
  getDistrictProgress: async (): Promise<any> => {
    try {
      return await apiClient.get<any>(ENDPOINTS.DISTRICT_PROGRESS);
    } catch (error) {
      console.error('Failed to fetch district progress:', error);
      // Return mock data for demo
      return {
        totalSchools: 45,
        activeSchools: 38,
        totalStudents: 2150,
        photosUploaded: 1247,
        certificatesGenerated: 892,
        overallProgress: 58,
      };
    }
  },

  // Get school progress
  getSchoolProgress: async (udiseCode: string): Promise<any> => {
    try {
      const endpoint = ENDPOINTS.SCHOOL_PROGRESS.replace(':udiseCode', udiseCode);
      return await apiClient.get<any>(endpoint);
    } catch (error) {
      console.error('Failed to fetch school progress:', error);
      // Return mock data for demo
      return {
        schoolName: 'राजकीय प्राथमिक शाला',
        totalStudents: 150,
        photosUploaded: 87,
        certificatesGenerated: 65,
        progress: 58,
        weeklyProgress: [45, 52, 58],
      };
    }
  },
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error: any, showAlert = true) => {
    let errorMessage = 'कुछ गलत हुआ है। कृपया बाद में प्रयास करें।';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    console.error('API Error:', error);
    
    if (showAlert) {
      Alert.alert('त्रुटि', errorMessage);
    }
    
    return errorMessage;
  },

  // Format date for API
  formatDate: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  // Check if in fast mode
  isFastMode: () => FAST_MODE,

  // Quick connectivity test
  quickConnectivityTest: async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second quick test
      
      const response = await fetch('https://httpbin.org/status/200', {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Quick connectivity test failed - will use mock data');
      return false;
    }
  },

  // Validate network connection
  checkNetworkConnection: async (): Promise<boolean> => {
    try {
      // Try to ping a simple endpoint first
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://httpbin.org/status/200', {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Network check failed:', error);
      return false;
    }
  },

  // Test API connectivity
  testAPIConnection: async (): Promise<{ connected: boolean; message: string }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Try to connect to the API base URL
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return {
          connected: true,
          message: 'API से सफलतापूर्वक जुड़ाव हो गया!'
        };
      } else {
        return {
          connected: false,
          message: `API response error: ${response.status}`
        };
      }
    } catch (error: any) {
      console.log('API connection test failed:', error);
      
      if (error.name === 'AbortError') {
        return {
          connected: false,
          message: 'API connection timeout - कृपया अपना internet connection check करें'
        };
      }
      
      return {
        connected: false,
        message: `API connection failed: ${error.message}`
      };
    }
  },
};

// Export the API client for advanced usage
export { apiClient };

// Default export with all APIs
export default {
  auth: authAPI,
  student: studentAPI,
  photo: photoAPI,
  certificate: certificateAPI,
  monitoring: monitoringAPI,
  verification: verificationAPI,
  progress: progressAPI,
  utils: apiUtils,
};
