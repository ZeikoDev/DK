import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

type FilterBarProps = {
  priceRange: string;
  setPriceRange: (range: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  people: number;
  setPeople: (people: number) => void;
};

const PRICE_RANGES = ['Todos', '€', '€€', '€€€', '€€€€'];

const FilterBar: React.FC<FilterBarProps> = ({
  priceRange,
  setPriceRange,
  date,
  setDate,
  people,
  setPeople
}) => {
  const formattedDate = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const increaseDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const decreaseDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const increasePeople = () => {
    if (people < 20) {
      setPeople(people + 1);
    }
  };

  const decreasePeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Precio:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.priceRanges}>
            {PRICE_RANGES.map((range) => (
              <TouchableOpacity 
                key={range} 
                style={[
                  styles.priceButton, 
                  priceRange === range && styles.priceButtonActive
                ]}
                onPress={() => setPriceRange(range)}
              >
                <Text style={[
                  styles.priceButtonText,
                  priceRange === range && styles.priceButtonTextActive
                ]}>
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Fecha:</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={decreaseDate} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <TouchableOpacity onPress={increaseDate} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Personas:</Text>
        <View style={styles.peopleSelector}>
          <TouchableOpacity onPress={decreasePeople} style={styles.peopleButton}>
            <Text style={styles.peopleButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.peopleText}>{people}</Text>
          <TouchableOpacity onPress={increasePeople} style={styles.peopleButton}>
            <Text style={styles.peopleButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    margin: SIZES.padding,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  filterSection: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    color: COLORS.subtext,
    marginBottom: SIZES.padding / 2,
  },
  priceRanges: {
    flexDirection: 'row',
  },
  priceButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  priceButtonText: {
    color: COLORS.subtext,
    fontWeight: 'bold',
  },
  priceButtonTextActive: {
    color: COLORS.text,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 2,
  },
  dateButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  peopleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  peopleButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 2,
  },
  peopleButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  peopleText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  applyButton: {
    backgroundColor: COLORS.accent,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.padding / 2,
  },
  applyButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});

export default FilterBar; 