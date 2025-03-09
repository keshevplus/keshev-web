import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Premium Car Services</Text>
          <Text style={styles.heroSubtitle}>Experience luxury and performance</Text>
          <Link href="/services" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Explore Services</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <View style={styles.servicesGrid}>
          {[
            { title: 'Car Repair', icon: '🔧' },
            { title: 'Maintenance', icon: '⚙️' },
            { title: 'Detailing', icon: '✨' },
            { title: 'Diagnostics', icon: '📊' },
          ].map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Expert Team</Text>
            <Text style={styles.featureText}>Professional certified mechanics</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Quality Parts</Text>
            <Text style={styles.featureText}>Original manufacturer components</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Fast Service</Text>
            <Text style={styles.featureText}>Quick turnaround time</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    height: 500,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  features: {
    gap: 15,
  },
  featureItem: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000000',
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
  },
});