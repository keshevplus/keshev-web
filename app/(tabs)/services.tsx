import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const services = [
  {
    title: 'Car Repair',
    description: 'Complete diagnostic and repair services for all car makes and models',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop',
    price: 'From $50',
  },
  {
    title: 'Regular Maintenance',
    description: 'Scheduled maintenance to keep your vehicle running at its best',
    image: 'https://images.unsplash.com/photo-1632823471565-1ecdf0c6c253?q=80&w=800&auto=format&fit=crop',
    price: 'From $30',
  },
  {
    title: 'Car Detailing',
    description: 'Professional cleaning and restoration services for your vehicle',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop',
    price: 'From $100',
  },
  {
    title: 'Diagnostics',
    description: 'Advanced computer diagnostics to identify any issues',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    price: 'From $40',
  },
];

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Services</Text>
        <Text style={styles.subtitle}>Professional car care solutions</Text>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <Image
              source={{ uri: service.image }}
              style={styles.serviceImage}
            />
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          </View>
        ))}
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
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  servicesContainer: {
    padding: 15,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 200,
  },
  serviceContent: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    lineHeight: 20,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4d4d',
  },
});