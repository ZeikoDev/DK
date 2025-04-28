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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

const CLUBS_DATA = [
  {
    id: '1',
    name: 'Dulcinea',
    image: require('../../assets/clubimages/dulcinea.jpeg'),  // Referencia a la imagen local
    rating: 4.1,
    price: '$$$',
    distance: '', 
    openTime: '21:30',
    capacity: 250,
    location: 'Laureles',
    latitude: 6.2297, 
    longitude: -75.5695,
  },
  {
    id: '2',
    name: 'Miranda',
    image: require('../../assets/clubimages/miranda.jpeg'),  // Referencia a la imagen local
    rating: 4.1,
    price: '$$',
    distance: '', 
    openTime: '19:00',
    capacity: 300,
    location: 'El Poblado',
    latitude: 6.1990,
    longitude: -75.5737,
  },
  {
    id: '3',
    name: 'La Logia',
    image: require('../../assets/clubimages/lalogia.jpeg'),  // Referencia a la imagen local
    rating: 4.1,
    price: '$$',
    distance: '', 
    openTime: '21:30',
    capacity: 200,
    location: 'Laureles',
    latitude: 6.2431,
    longitude: -75.5791,
  },
  {
    id: '4',
    name: 'Tutaina',
    image: require('../../assets/clubimages/tutaina_poblado.jpeg'),  // Referencia a la imagen local
    rating: 4.4,
    price: '$',
    distance: '', 
    openTime: '19:00',
    capacity: 220,
    location: 'El Poblado',
    latitude: 6.1995,
    longitude: -75.5728,
  },
  {
    id: '5',
    name: 'La Julieta',
    image: require('../../assets/clubimages/julieta.jpeg'),  // Referencia a la imagen local
    rating: 4.1,
    price: '$',
    distance: '', 
    openTime: '19:00',
    capacity: 180,
    location: 'Laureles',
    latitude: 6.2423,
    longitude: -75.5802,
  },
];

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
          navigation={navigation}
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