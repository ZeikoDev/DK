export const COLORS = {
  primary: '#FF00FF', // Rosa neón
  secondary: '#00FFFF', // Cian neón
  accent: '#39FF14', // Verde neón
  highlight: '#FE0000', // Rojo neón
  background: '#121212', // Fondo oscuro
  card: '#1E1E1E', // Fondo de tarjetas
  text: '#FFFFFF', // Texto blanco
  subtext: '#BBBBBB', // Subtexto
  border: '#333333', // Bordes
};

export const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  padding: 15,
  radius: 10,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
}; 