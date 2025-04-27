import React, { useState, Dispatch, SetStateAction } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';
import ClubCard from '../components/ClubCard';
import SearchBar from '../components/SearchBar';
import SimpleCarousel from '../components/SimpleCarousel';
import PriceSlider from '../components/PriceSlider';
import PartySelector from '../components/PartySelector';
import DateTimeSelector from '../components/DateTimeSelector';

// Datos de ejemplo para las discotecas
const CLUBS_DATA = [
  {
    id: '1',
    name: 'Miranda',
    image: 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=Medellin,Colombia',
    rating: 4.1,
    price: '$$',
    distance: '0.5 km',
    openTime: '19:00',
    capacity: 150,
    location: 'El Poblado'
  },
  {
    id: '2',
    name: 'Elektric',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop',
    rating: 4.5,
    price: '€€',
    distance: '1.2 km',
    openTime: '22:00',
    capacity: 200,
    location: 'Zona Rosa'
  },
  {
    id: '3',
    name: 'Ultraviolet',
    image: 'https://images.unsplash.com/photo-1571235705574-62d768598968?w=800&auto=format&fit=crop',
    rating: 4.9,
    price: '€€€€',
    distance: '2.1 km',
    openTime: '23:30',
    capacity: 180,
    location: 'Condesa'
  },
  {
    id: '4',
    name: 'Bassline',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
    rating: 4.7,
    price: '€€',
    distance: '3.0 km',
    openTime: '22:30',
    capacity: 250,
    location: 'Roma Norte'
  },
];

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('22:00');
  const [peopleCount, setPeopleCount] = useState(4);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [activeClubIndex, setActiveClubIndex] = useState(0);

  const handleSnapToItem = (index: number) => {
    setActiveClubIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>DISCOTEK</Text>
        <Text style={styles.tagline}>Donde es el parche hoy?</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SimpleCarousel 
          data={CLUBS_DATA}
          onSnapToItem={handleSnapToItem}
        />

        <View style={styles.searchSection}>
          <SearchBar />

          <View style={styles.filterBlock}>
            <Text style={styles.filterTitle}>cuando y a que horas?</Text>
            <DateTimeSelector 
              initialDate={selectedDate}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />

            <Text style={styles.filterTitle}>Presupuesto</Text>
            <PriceSlider 
              minPrice={50000}          // Precio mínimo: 50,000 COP
              maxPrice={10000000}       // Precio máximo: 10,000,000 COP
              initialPrice={maxPrice}   // Usar el valor de maxPrice como el inicial
              onValueChange={(value: number) => setMaxPrice(value)}  // Actualiza el estado cuando el valor cambia
            />

            <Text style={styles.filterTitle}>Cuantos somos?</Text>
            <PartySelector 
              initialValue={peopleCount}
              onValueChange={setPeopleCount}
            />

            <View style={styles.findButtonContainer}>
              <TouchableOpacity style={styles.findButton}>
                <Text style={styles.findButtonText}>Buscar Discotecas</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    paddingTop: SIZES.padding * 1,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  logo: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textShadowColor: COLORS.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginTop: SIZES.padding / 4,
  },
  searchSection: {
    marginTop: SIZES.padding,
  },
  filterBlock: {
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding * 2,
  },
  filterTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  findButtonContainer: {
    paddingBottom: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
  findButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius * 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  findButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});

export default HomeScreen; 