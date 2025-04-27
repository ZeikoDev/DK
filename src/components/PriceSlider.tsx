import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, SIZES, FONTS } from '../styles/theme';  // Asegúrate de que la ruta del theme sea correcta

interface PriceSliderProps {
  initialPrice?: number;   // Valor inicial opcional
  minPrice: number;        // Precio mínimo
  maxPrice: number;        // Precio máximo
  onValueChange: (value: number) => void;  // Función para actualizar el valor
}

const PriceSlider: React.FC<PriceSliderProps> = ({ initialPrice = 50000, minPrice, maxPrice, onValueChange }) => {
  const [price, setPrice] = useState<number>(initialPrice);

  // Ensure the component updates when initialPrice changes from the parent
  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const handleValueChange = (value: number) => {
    setPrice(value);
    onValueChange(value);  // Actualiza el valor en el componente padre
  };

  // Helper function to format price with thousand separators
  const formatPrice = (value: number): string => {
    return value.toLocaleString('es-CO');
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={minPrice}
        maximumValue={maxPrice}
        value={price}
        onValueChange={handleValueChange}
        minimumTrackTintColor={COLORS.secondary}
        maximumTrackTintColor={COLORS.border}
        thumbTintColor={COLORS.primary}
        step={1000}  // Paso de 1,000 COP
      />
      <Text style={styles.price}>COP ${formatPrice(price)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    color: COLORS.text,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  price: {
    color: COLORS.text,
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    marginTop: 10,
  },
});

export default PriceSlider;