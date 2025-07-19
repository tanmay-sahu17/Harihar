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

interface DEOHomeScreenProps {
  onBack?: () => void;
}

const DEOHomeScreen: React.FC<DEOHomeScreenProps> = ({ onBack }) => {
  const districtStats = [
    { label: 'कुल ब्लॉक', value: '8', icon: '🏛️' },
    { label: 'कुल CRC', value: '120', icon: '📍' },
    { label: 'कुल स्कूल', value: '1,408', icon: '🏫' },
    { label: 'कुल पेड़', value: '41,920', icon: '🌳' },
  ];

  const blockPerformance = [
    { name: 'रायपुर ब्लॉक-1', beo: 'श्री राजेश कुमार', clusters: 15, performance: 88, trend: 'up' },
    { name: 'धमतरी ब्लॉक', beo: 'श्रीमती प्रिया शर्मा', clusters: 18, performance: 82, trend: 'up' },
    { name: 'गरियाबंद ब्लॉक', beo: 'श्री सुनील गुप्ता', clusters: 14, performance: 75, trend: 'stable' },
    { name: 'महासमुंद ब्लॉक', beo: 'श्री विकास तिवारी', clusters: 12, performance: 68, trend: 'down' },
    { name: 'बालोद ब्लॉक', beo: 'श्रीमती अनीता देवी', clusters: 16, performance: 63, trend: 'down' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return '#4CAF50';
    if (performance >= 60) return '#FF9800';
    return '#F44336';
  };

  const quickActions = [
    { id: 'blocks', title: 'ब्लॉक मॉनिटरिंग', icon: '🏛️', color: '#FF5722' },
    { id: 'analytics', title: 'डेटा एनालिटिक्स', icon: '📊', color: '#3F51B5' },
    { id: 'reports', title: 'डिस्ट्रिक्ट रिपोर्ट', icon: '📋', color: '#4CAF50' },
    { id: 'meetings', title: 'वीडियो कॉन्फ्रेंस', icon: '🎥', color: '#9C27B0' },
  ];

  const yearlyTargets = [
    { title: 'पेड़ लगाने का लक्ष्य', target: 50000, achieved: 41920, percentage: 84 },
    { title: 'जीवित रहने की दर', target: 85, achieved: 78, percentage: 92 },
    { title: 'स्कूल कवरेज', target: 100, achieved: 95, percentage: 95 },
  ];

  const recentAchievements = [
    { title: 'राज्य स्तर पर प्रथम स्थान', description: 'पर्यावरण संरक्षण में', icon: '🏆' },
    { title: '50,000+ पेड़ लगाए', description: 'इस शैक्षणिक वर्ष में', icon: '🌳' },
    { title: '95% स्कूल कवरेज', description: 'जिला स्तर पर हासिल', icon: '🎯' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>नमस्ते DEO महोदय! 🙏</Text>
            <Text style={styles.subtitle}>District Education Officer</Text>
            <Text style={styles.districtInfo}>रायपुर जिला</Text>
          </View>
        </View>

        {/* District Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 जिला आंकड़े</Text>
          <View style={styles.statsGrid}>
            {districtStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ त्वरित कार्य</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={[styles.actionCard, { borderColor: action.color }]}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Yearly Targets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 वार्षिक लक्ष्य</Text>
          <View style={styles.targetsContainer}>
            {yearlyTargets.map((target, index) => (
              <View key={index} style={styles.targetCard}>
                <Text style={styles.targetTitle}>{target.title}</Text>
                <View style={styles.targetProgress}>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { width: `${target.percentage}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.targetPercentage}>{target.percentage}%</Text>
                </View>
                <Text style={styles.targetNumbers}>
                  {target.achieved.toLocaleString()} / {target.target.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Block Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏛️ ब्लॉक प्रदर्शन रैंकिंग</Text>
          <View style={styles.performanceContainer}>
            {blockPerformance.map((block, index) => (
              <TouchableOpacity key={index} style={styles.blockCard}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.blockInfo}>
                  <Text style={styles.blockName}>{block.name}</Text>
                  <Text style={styles.beoName}>BEO: {block.beo}</Text>
                  <Text style={styles.clusterCount}>{block.clusters} क्लस्टर</Text>
                </View>
                <View style={styles.performanceInfo}>
                  <View style={styles.performanceScore}>
                    <Text style={[styles.scoreText, { color: getPerformanceColor(block.performance) }]}>
                      {block.performance}%
                    </Text>
                    <Text style={styles.trendIcon}>{getTrendIcon(block.trend)}</Text>
                  </View>
                  <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.detailButtonText}>विस्तार →</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 हाल की उपलब्धियां</Text>
          <View style={styles.achievementsContainer}>
            {recentAchievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDesc}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Important Notices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📢 महत्वपूर्ण सूचनाएं</Text>
          <View style={styles.noticesContainer}>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeIcon}>🚨</Text>
              <View style={styles.noticeContent}>
                <Text style={styles.noticeTitle}>राज्य स्तरीय बैठक</Text>
                <Text style={styles.noticeDesc}>15 मार्च को भोपाल में महत्वपूर्ण बैठक</Text>
                <Text style={styles.noticeTime}>कल, 10:00 AM</Text>
              </View>
            </View>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeIcon}>📋</Text>
              <View style={styles.noticeContent}>
                <Text style={styles.noticeTitle}>त्रैमासिक रिपोर्ट जमा करें</Text>
                <Text style={styles.noticeDesc}>सभी BEO से रिपोर्ट की समीक्षा करें</Text>
                <Text style={styles.noticeTime}>अगले सप्ताह तक</Text>
              </View>
            </View>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeIcon}>🌱</Text>
              <View style={styles.noticeContent}>
                <Text style={styles.noticeTitle}>वृक्षारोपण अभियान</Text>
                <Text style={styles.noticeDesc}>मानसून सीजन की तैयारी शुरू करें</Text>
                <Text style={styles.noticeTime}>मई 2024 से</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Monthly Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 मासिक विश्लेषण</Text>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>पेड़ों की जीवित रहने की दर</Text>
              <Text style={styles.analyticsValue}>78%</Text>
              <Text style={styles.analyticsChange}>+5% पिछले महीने से</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>शिक्षक सहभागिता</Text>
              <Text style={styles.analyticsValue}>85%</Text>
              <Text style={styles.analyticsChange}>+2% पिछले महीने से</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsTitle}>फोटो अपलोड दर</Text>
              <Text style={styles.analyticsValue}>92%</Text>
              <Text style={styles.analyticsChange}>+8% पिछले महीने से</Text>
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
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
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
  welcomeSection: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  districtInfo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFCCBC',
  },
  statIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  targetsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  targetCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  targetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  targetProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#FF5722',
    borderRadius: 4,
  },
  targetPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF5722',
    minWidth: 35,
  },
  targetNumbers: {
    fontSize: 12,
    color: '#666',
  },
  performanceContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  blockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  blockInfo: {
    flex: 1,
  },
  blockName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  beoName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  clusterCount: {
    fontSize: 11,
    color: '#999',
  },
  performanceInfo: {
    alignItems: 'center',
  },
  performanceScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  trendIcon: {
    fontSize: 14,
  },
  detailButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  detailButtonText: {
    fontSize: 11,
    color: '#E65100',
    fontWeight: 'bold',
  },
  achievementsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  achievementDesc: {
    fontSize: 13,
    color: '#666',
  },
  noticesContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  noticeDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  noticeTime: {
    fontSize: 11,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsCard: {
    backgroundColor: 'white',
    width: (width - 70) / 3,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  analyticsTitle: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  analyticsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 3,
  },
  analyticsChange: {
    fontSize: 9,
    color: '#4CAF50',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 20,
  },
});

export default DEOHomeScreen;
