import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ProgressTrackingScreenProps {
  onBack: () => void;
}

const ProgressTrackingScreen: React.FC<ProgressTrackingScreenProps> = ({ onBack }) => {
  const monthlyProgress = [
    { month: 'जनवरी', target: 500, achieved: 420, percentage: 84 },
    { month: 'फरवरी', target: 450, achieved: 380, percentage: 84 },
    { month: 'मार्च', target: 600, achieved: 520, percentage: 87 },
    { month: 'अप्रैल', target: 550, achieved: 490, percentage: 89 },
  ];

  const schoolProgress = [
    { name: 'राजकीय प्राथमिक शाला', progress: 95, trees: 45, target: 50 },
    { name: 'सरस्वती विद्या मंदिर', progress: 76, trees: 38, target: 50 },
    { name: 'गांधी प्राथमिक शाला', progress: 104, trees: 52, target: 50 },
    { name: 'नेहरू बाल शिक्षालय', progress: 46, trees: 23, target: 50 },
    { name: 'आदर्श प्राथमिक शाला', progress: 82, trees: 41, target: 50 },
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 70) return '#FF9800';
    return '#F44336';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 100) return '#4CAF50';
    if (progress >= 75) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>प्रगति ट्रैकिंग</Text>
            <Text style={styles.subtitle}>Progress Tracking Dashboard</Text>
          </View>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2,340</Text>
            <Text style={styles.statLabel}>कुल पेड़ लगाए</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>लक्ष्य पूर्ति</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>स्कूल सहभागी</Text>
          </View>
        </View>

        {/* Monthly Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>मासिक प्रगति</Text>
          {monthlyProgress.map((month, index) => (
            <View key={index} style={styles.monthCard}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthName}>{month.month}</Text>
                <View style={[styles.percentageBadge, { backgroundColor: getProgressColor(month.percentage) }]}>
                  <Text style={styles.percentageText}>{month.percentage}%</Text>
                </View>
              </View>
              <View style={styles.progressDetails}>
                <Text style={styles.progressText}>
                  लक्ष्य: {month.target} | प्राप्त: {month.achieved}
                </Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${month.percentage}%`,
                        backgroundColor: getProgressColor(month.percentage)
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* School-wise Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>स्कूल-वार प्रगति</Text>
          {schoolProgress.map((school, index) => (
            <View key={index} style={styles.schoolCard}>
              <View style={styles.schoolHeader}>
                <Text style={styles.schoolName}>{school.name}</Text>
                <Text style={styles.schoolPercentage}>{school.progress}%</Text>
              </View>
              
              <View style={styles.schoolDetails}>
                <Text style={styles.schoolStats}>
                  {school.trees}/{school.target} पेड़ लगाए
                </Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${Math.min(school.progress, 100)}%`,
                        backgroundColor: getProgressBarColor(school.progress)
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Achievement Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>उपलब्धि माइलस्टोन</Text>
          <View style={styles.milestoneContainer}>
            <View style={styles.milestoneCard}>
              <Text style={styles.milestoneEmoji}>🎯</Text>
              <Text style={styles.milestoneTitle}>पहला लक्ष्य</Text>
              <Text style={styles.milestoneDesc}>1000 पेड़ लगाने का लक्ष्य</Text>
              <View style={styles.achievedBadge}>
                <Text style={styles.achievedText}>✓ पूर्ण</Text>
              </View>
            </View>
            
            <View style={styles.milestoneCard}>
              <Text style={styles.milestoneEmoji}>🌟</Text>
              <Text style={styles.milestoneTitle}>दूसरा लक्ष्य</Text>
              <Text style={styles.milestoneDesc}>2000 पेड़ लगाने का लक्ष्य</Text>
              <View style={styles.achievedBadge}>
                <Text style={styles.achievedText}>✓ पूर्ण</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8FF',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 15,
  },
  monthCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressDetails: {
    marginTop: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  schoolCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  schoolPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  schoolDetails: {
    marginTop: 5,
  },
  schoolStats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  milestoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: (width - 60) / 2,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  milestoneEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  milestoneDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  achievedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  achievedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});

export default ProgressTrackingScreen;
