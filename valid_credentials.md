# Valid Login Credentials - For Testing

## 🔐 **Valid Teacher Login Credentials:**

### Teacher 1:
- **UDISE Code**: `123`
- **Teacher Name**: `teacher`
- **Password**: `123`

### Teacher 2:
- **UDISE Code**: `456`  
- **Teacher Name**: `admin`
- **Password**: `456`

---

## 👨‍💼 **Valid CRC/Supervisor Login Credentials:**

### CRC 1:
- **Username**: `crc`
- **Phone Number**: `1234567890`
- **Password**: `123`

### CRC 2:
- **Username**: `admin`
- **Phone Number**: `0987654321`
- **Password**: `456`
- **Phone Number**: `8765432109`  
- **Password**: `crc456`

### CRC 3:
- **Username**: `manoj_verma`
- **Phone Number**: `7654321098`
- **Password**: `crc789`

---

## ⚠️ **Important Notes:**

1. **सिर्फ ये credentials से ही login हो सकता है**
2. **कोई भी random ID/password काम नहीं करेगा**
3. **सभी fields exact match होने चाहिए (case-sensitive)**
4. **Backend ready होने पर ये credentials हटा दिए जाएंगे**

---

## 🧪 **Testing Instructions:**

### Teacher Login Test:
1. User Type में "Teacher" select करें
2. UDISE Code: `12345678`
3. Teacher Name: `Radha Sharma`  
4. Password: `teacher123`
5. Login button दबाएं

### CRC Login Test:
1. User Type में "CRC/Supervisor" select करें
2. Username: `crc_admin`
3. Phone Number: `9876543210`
4. Password: `crc123`
5. Login button दबाएं

---

## 🚫 **Invalid Credentials:**

अगर कोई भी गलत credential डालते हैं तो:
- **Error Message**: "गलत UDISE कोड, नाम या पासवर्ड"
- **Login Failed**: Home screen नहीं खुलेगा
- **Console Log**: "Login failed - invalid credentials"

---

**अब app test करिए - सिर्फ valid credentials से ही login होगा!** ✅
