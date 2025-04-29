import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReservationScreen from '../screens/ReservationScreen';
import { COLORS } from '../styles/theme';
import { ImageSourcePropType } from 'react-native';

// Definición del tipo para los parámetros de ruta
export type RootStackParamList = {
  Home: undefined;
  Reservation: {
    club: {
      id: string;
      name: string;
      image: ImageSourcePropType;
      rating: number;
      price: string;
      openTime: string;
      capacity: number;
      location?: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
