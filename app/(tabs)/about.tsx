import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1625047509168-a7026afe0c33?q=80&w=800&auto=format&fit=crop',
          }}
          style={styles.headerImage}
        /> */}
        <View style={styles.overlay}>
          <Text style={styles.title}>אודות קשב פלוס</Text>
          <Text style={styles.subtitle}>המרכז להפרעות קשב ופעלתנות יתר</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.text}>
          Founded in 2020, Mobiliil has grown to become a leading automotive
          service provider. We pride ourselves on delivering exceptional car
          care services with a focus on quality, reliability, and customer
          satisfaction.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesGrid}>
          {[
            {
              title: 'Quality',
              description: 'We never compromise on the quality of our service',
            },
            {
              title: 'Integrity',
              description: 'Honest and transparent in everything we do',
            },
            {
              title: 'Innovation',
              description: 'Using the latest technology and techniques',
            },
            {
              title: 'Customer First',
              description: 'Your satisfaction is our top priority',
            },
          ].map((value, index) => (
            <View key={index} style={styles.valueCard}>
              <Text style={styles.valueTitle}>{value.title}</Text>
              <Text style={styles.valueDescription}>{value.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <View style={styles.teamGrid}>
          {[
            {
              name: 'John Smith',
              role: 'Master Mechanic',
              image:
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
            },
            {
              name: 'Sarah Johnson',
              role: 'Service Manager',
              image:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
            },
          ].map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <Image source={{ uri: member.image }} style={styles.teamImage} />
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          ))}
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
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000000',
  },
  valueDescription: {
    fontSize: 14,
    color: '#666666',
  },
  teamGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamMember: {
    width: '48%',
    alignItems: 'center',
  },
  teamImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  teamRole: {
    fontSize: 14,
    color: '#666666',
  },
});
