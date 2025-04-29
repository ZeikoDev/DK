import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

// Tipo para las propiedades del club
type Club = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  rating: number;
  price: string;
  distance: string;
  openTime: string;
  capacity: number;
  location?: string;
};

// Tipo para las propiedades del componente
type ClubCardProps = {
  club: Club;
  isSmall?: boolean;
  navigation?: any;
};

const { width } = Dimensions.get('window');

const ClubCard: React.FC<ClubCardProps> = ({ club, isSmall = false, navigation }) => {
  const cardWidth = isSmall ? width * 0.8 : width * 0.85;
  const cardHeight = isSmall ? 180 : 280;

  const handleReservePress = () => {
    if (navigation) {
      navigation.navigate('Reservation', { club });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: cardWidth,
          height: cardHeight,
        },
      ]}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={club.image}
        style={styles.image}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.topContent}>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.rating}>{club.rating}</Text>
            </View>
            {!isSmall && (
              <View style={styles.navigationButtons}>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>◀</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                  <Text style={styles.navButtonText}>▶</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.name}>{club.name}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>{club.location || 'Downtown'}</Text>
            </View>

            <View style={styles.indicators}>
              <View style={[styles.indicator, styles.activeIndicator]} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
            </View>

            {!isSmall && (
              <TouchableOpacity style={styles.reserveButton} onPress={handleReservePress}>
                <Text style={styles.reserveButtonText}>Reservar Ahora</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>

      {isSmall && (
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>💰 {club.price}</Text>
          <Text style={styles.infoText}>🕒 {club.openTime}</Text>
          <Text style={styles.infoText}>👥 {club.capacity}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius * 2,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: SIZES.radius * 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding / 4,
    borderRadius: SIZES.radius,
  },
  starIcon: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
    marginRight: 4,
  },
  rating: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  bottomContent: {
    alignItems: 'flex-start',
  },
  name: {
    color: COLORS.text,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: SIZES.medium,
    marginRight: 4,
  },
  location: {
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  indicators: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginRight: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.secondary,
    width: 24,
  },
  reserveButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignSelf: 'stretch',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  reserveButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  infoRow: {
    position: 'absolute',
    bottom: SIZES.padding,
    right: SIZES.padding,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding / 4,
  },
  infoText: {
    color: COLORS.text,
    fontSize: SIZES.small,
    marginRight: SIZES.padding / 2,
  },
});

export default ClubCard;
