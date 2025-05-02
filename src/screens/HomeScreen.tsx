import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
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
import * as Location from 'expo-location';

const CLUBS_DATA = [
  {
    id: '1',
    name: 'Dulcinea',
    image: require('../../assets/clubimages/dulcinea.jpeg'),
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
    image: require('../../assets/clubimages/miranda.jpeg'),
    rating: 4.1,
    price: '$$',
    distance: '',
    openTime: '19:00',
    capacity: 300,
    location: 'El Poblado',
    latitude: 6.199,
    longitude: -75.5737,
  },
  {
    id: '3',
    name: 'La Logia',
    image: require('../../assets/clubimages/lalogia.jpeg'),
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
    image: require('../../assets/clubimages/tutaina_poblado.jpeg'),
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
    image: require('../../assets/clubimages/julieta.jpeg'),
    rating: 4.1,
    price: '$',
    distance: '',
    openTime: '19:00',
    capacity: 180,
    location: 'Laureles',
    latitude: 6.2423,
    longitude: -75.5802,
  },
  {
    id: '6',
    name: 'Salón Amador',
    image: require('../../assets/clubimages/dulcinea.jpeg'),
    rating: 4.5,
    price: '$$$',
    distance: '',
    openTime: '22:00',
    capacity: 400,
    location: 'El Poblado',
    latitude: 6.201,
    longitude: -75.572,
  },
  {
    id: '7',
    name: 'Calle 9+1',
    image: require('../../assets/clubimages/miranda.jpeg'),
    rating: 4.2,
    price: '$$',
    distance: '',
    openTime: '20:00',
    capacity: 280,
    location: 'Centro',
    latitude: 6.247,
    longitude: -75.5746,
  },
  {
    id: '8',
    name: 'Babylon Club',
    image: require('../../assets/clubimages/lalogia.jpeg'),
    rating: 4.3,
    price: '$$$',
    distance: '',
    openTime: '23:00',
    capacity: 350,
    location: 'El Poblado',
    latitude: 6.203,
    longitude: -75.571,
  },
  {
    id: '9',
    name: 'Perro Negro',
    image: require('../../assets/clubimages/tutaina_poblado.jpeg'),
    rating: 4.0,
    price: '$',
    distance: '',
    openTime: '18:00',
    capacity: 150,
    location: 'Envigado',
    latitude: 6.167,
    longitude: -75.583,
  },
  {
    id: '10',
    name: 'Vintrash',
    image: require('../../assets/clubimages/julieta.jpeg'),
    rating: 4.6,
    price: '$$',
    distance: '',
    openTime: '20:30',
    capacity: 200,
    location: 'Provenza',
    latitude: 6.209,
    longitude: -75.569,
  },
  {
    id: '11',
    name: 'Bolivar Club',
    image: require('../../assets/clubimages/dulcinea.jpeg'),
    rating: 4.2,
    price: '$$$',
    distance: '',
    openTime: '22:30',
    capacity: 320,
    location: 'Centro',
    latitude: 6.251,
    longitude: -75.569,
  },
  {
    id: '12',
    name: 'Envy Rooftop',
    image: require('../../assets/clubimages/miranda.jpeg'),
    rating: 4.7,
    price: '$$$',
    distance: '',
    openTime: '21:00',
    capacity: 280,
    location: 'El Poblado',
    latitude: 6.208,
    longitude: -75.567,
  },
];

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Función para calcular la distancia entre dos puntos usando la fórmula de Haversine
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en km
  return distance;
};

// Función para formatear la distancia
const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('22:00');
  const [peopleCount, setPeopleCount] = useState(4);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [activeClubIndex, setActiveClubIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState(CLUBS_DATA);
  const [showFiltered, setShowFiltered] = useState(false);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [clubsWithDistance, setClubsWithDistance] = useState(CLUBS_DATA);

  // Solicitar permiso de ubicación y obtener la ubicación actual
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);

          // Calcular distancias para todos los clubes
          updateClubDistances(location);
        } else {
          Alert.alert(
            'Permiso de ubicación denegado',
            'No podemos mostrar la distancia a las discotecas sin acceso a tu ubicación.'
          );
        }
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
      }
    })();
  }, []);

  // Función para actualizar las distancias de los clubes
  const updateClubDistances = (location: Location.LocationObject) => {
    const { latitude, longitude } = location.coords;

    const clubsWithDistanceData = CLUBS_DATA.map(club => {
      if (club.latitude && club.longitude) {
        const distanceValue = calculateDistance(latitude, longitude, club.latitude, club.longitude);
        return {
          ...club,
          distance: formatDistance(distanceValue),
          distanceValue, // Guardamos el valor numérico para poder ordenar
        };
      }
      return club;
    });

    // Ordenar los clubes por distancia automáticamente
    const sortedClubs = [...clubsWithDistanceData].sort((a, b) => {
      // @ts-ignore - Sabemos que distanceValue existe porque lo añadimos arriba
      return (a.distanceValue || Infinity) - (b.distanceValue || Infinity);
    });

    setClubsWithDistance(sortedClubs);

    // También actualizamos los clubes filtrados si es necesario
    if (showFiltered) {
      const updatedFilteredClubs = filteredClubs.map(club => {
        const updatedClub = clubsWithDistanceData.find(c => c.id === club.id);
        return updatedClub || club;
      });

      // Ordenar también los clubes filtrados
      const sortedFilteredClubs = [...updatedFilteredClubs].sort((a, b) => {
        // @ts-ignore
        return (a.distanceValue || Infinity) - (b.distanceValue || Infinity);
      });

      setFilteredClubs(sortedFilteredClubs);
    }
  };

  // Función para convertir el precio simbólico ($, $$, $$$) a un valor numérico aproximado
  const getPriceValue = (priceSymbol: string): number => {
    switch (priceSymbol) {
      case '$':
        return 100000; // Económico: ~100,000 COP
      case '$$':
        return 300000; // Moderado: ~300,000 COP
      case '$$$':
        return 500000; // Costoso: ~500,000 COP
      default:
        return 1000000; // Muy costoso: ~1,000,000 COP
    }
  };

  // Función para filtrar clubes por texto de búsqueda
  const filterBySearchQuery = (clubs: typeof CLUBS_DATA, query: string) => {
    if (!query.trim()) return clubs;

    const lowercaseQuery = query.toLowerCase().trim();
    return clubs.filter(
      club =>
        club.name.toLowerCase().includes(lowercaseQuery) ||
        (club.location && club.location.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Función para filtrar clubes por todos los criterios
  const applyAllFilters = () => {
    let results = [...clubsWithDistance]; // Usar los clubes con información de distancia

    // Filtrar por texto de búsqueda
    if (searchQuery.trim()) {
      results = filterBySearchQuery(results, searchQuery);
    }

    // Filtrar por precio máximo
    results = results.filter(club => getPriceValue(club.price) <= maxPrice);

    // Filtrar por hora de apertura (clubes que ya estén abiertos a la hora seleccionada)
    const selectedTimeValue = parseInt(selectedTime.replace(':', ''));
    results = results.filter(club => {
      const clubOpenTimeValue = parseInt(club.openTime.replace(':', ''));
      return clubOpenTimeValue <= selectedTimeValue;
    });

    // Ordenar los resultados por distancia
    results = results.sort((a, b) => {
      // @ts-ignore
      return (a.distanceValue || Infinity) - (b.distanceValue || Infinity);
    });

    // Actualizar el estado con los resultados filtrados
    setFilteredClubs(results);
    setShowFiltered(true);

    // Mostrar mensaje si no hay resultados
    if (results.length === 0) {
      Alert.alert(
        'Sin resultados',
        'No se encontraron discotecas que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.',
        [{ text: 'OK', onPress: () => setShowFiltered(false) }]
      );
    }
  };

  const handleSnapToItem = (index: number) => {
    setActiveClubIndex(index);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    // Si el usuario borra la búsqueda, volvemos a mostrar todos los clubes
    if (!text.trim()) {
      setShowFiltered(false);
    }
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
          data={showFiltered ? filteredClubs : clubsWithDistance}
          onSnapToItem={handleSnapToItem}
          navigation={navigation}
        />

        <View style={styles.searchSection}>
          <SearchBar onSearch={handleSearch} />

          <View style={styles.filterBlock}>
            <Text style={styles.filterTitle}>cuando y a que horas?</Text>
            <DateTimeSelector
              initialDate={selectedDate}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />

            <Text style={styles.filterTitle}>Presupuesto</Text>
            <PriceSlider
              minPrice={50000} // Precio mínimo: 50,000 COP
              maxPrice={10000000} // Precio máximo: 10,000,000 COP
              initialPrice={maxPrice} // Usar el valor de maxPrice como el inicial
              onValueChange={(value: number) => setMaxPrice(value)} // Actualiza el estado cuando el valor cambia
            />

            <Text style={styles.filterTitle}>Cuantos somos?</Text>
            <PartySelector initialValue={peopleCount} onValueChange={setPeopleCount} />

            <View style={styles.findButtonContainer}>
              <TouchableOpacity style={styles.findButton} onPress={applyAllFilters}>
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
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius * 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...SHADOWS.medium,
  },
  findButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});

export default HomeScreen;
