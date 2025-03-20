import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Get in touch with our team</Text>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#ff4d4d" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Address</Text>
            <Text style={styles.infoContent}>123 Car Service Street</Text>
            <Text style={styles.infoContent}>New York, NY 10001</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call" size={24} color="#ff4d4d" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={styles.infoContent}>+1 (555) 123-4567</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="mail" size={24} color="#ff4d4d" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoContent}>dr@keshevplus.co.il</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Send us a message</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Message"
          value={form.message}
          onChangeText={(text) => setForm({ ...form, message: text })}
          multiline
          numberOfLines={4}
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </Pressable>
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
  contactInfo: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 14,
    color: '#666666',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
