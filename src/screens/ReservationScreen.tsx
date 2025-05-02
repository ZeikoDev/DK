import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';
import DateTimeSelector from '../components/DateTimeSelector';
import PartySelector from '../components/PartySelector';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

// Tipo para las props de la pantalla de reserva
type ReservationScreenProps = NativeStackScreenProps<RootStackParamList, 'Reservation'>;

const ReservationScreen: React.FC<ReservationScreenProps> = ({ route, navigation }) => {
  const { club } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(club.openTime || '22:00');
  const [peopleCount, setPeopleCount] = useState(4);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleReservation = () => {
    // Validación básica
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Información incompleta', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    // Aquí iría la lógica para enviar la reserva a un backend
    Alert.alert(
      'Reserva Confirmada',
      `Tu reserva en ${club.name} ha sido confirmada para ${selectedDate.toLocaleDateString()} a las ${selectedTime} para ${peopleCount} personas.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservar en {club.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={club.image} style={styles.clubImage} resizeMode="cover">
          <View style={styles.overlay}>
            <Text style={styles.clubName}>{club.name}</Text>
            <View style={styles.clubInfoRow}>
              <Text style={styles.clubInfo}>⭐ {club.rating}</Text>
              <Text style={styles.clubInfo}>💰 {club.price}</Text>
              <Text style={styles.clubInfo}>📍 {club.location}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Detalles de la Reserva</Text>

          <Text style={styles.label}>Fecha y Hora</Text>
          <DateTimeSelector
            initialDate={selectedDate}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
          />

          <Text style={styles.label}>Número de Personas</Text>
          <PartySelector initialValue={peopleCount} onValueChange={setPeopleCount} />

          <Text style={styles.sectionTitle}>Información de Contacto</Text>

          <Text style={styles.label}>
            Nombre Completo <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre completo"
            placeholderTextColor={COLORS.border}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Correo Electrónico <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
            placeholderTextColor={COLORS.border}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>
            Teléfono <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Tu número de teléfono"
            placeholderTextColor={COLORS.border}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Solicitudes Especiales</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Cualquier solicitud especial para tu reserva..."
            placeholderTextColor={COLORS.border}
            multiline
            numberOfLines={4}
            value={specialRequests}
            onChangeText={setSpecialRequests}
          />

          <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
            <Text style={styles.reserveButtonText}>Confirmar Reserva</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clubImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SIZES.padding,
  },
  clubName: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  clubInfoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  clubInfo: {
    color: COLORS.text,
    marginRight: SIZES.padding,
    fontSize: SIZES.medium,
  },
  formContainer: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  required: {
    color: COLORS.secondary,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    color: COLORS.text,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  reserveButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius * 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    ...SHADOWS.medium,
  },
  reserveButtonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
