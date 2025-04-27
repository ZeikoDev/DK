import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

interface PartySelectorProps {
  initialValue?: number;
  maxParty?: number;
  onValueChange?: (value: number) => void;
}

const PartySelector: React.FC<PartySelectorProps> = ({ 
  initialValue = 4, 
  maxParty = 20,
  onValueChange 
}) => {
  const [people, setPeople] = useState(initialValue);
  const [modalVisible, setModalVisible] = useState(false);
  
  const peopleOptions = Array.from({ length: maxParty }, (_, index) => index + 1);

  const handleSelectPeople = (value: number) => {
    setPeople(value);
    if (onValueChange) {
      onValueChange(value);
    }
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>{people} {people === 1 ? 'Persona' : 'Personas'}</Text>
        <Text style={styles.selectorIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Personas</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={peopleOptions}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.optionItem,
                    people === item && styles.selectedOptionItem
                  ]}
                  onPress={() => handleSelectPeople(item)}
                >
                  <Text 
                    style={[
                      styles.optionText,
                      people === item && styles.selectedOptionText
                    ]}
                  >
                    {item} {item === 1 ? 'Persona' : 'Personas'}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.optionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectorText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  selectorIcon: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SIZES.padding,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  optionsList: {
    paddingHorizontal: SIZES.padding,
  },
  optionItem: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOptionItem: {
    backgroundColor: `${COLORS.secondary}20`, // 20% de opacidad
  },
  optionText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  selectedOptionText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});

export default PartySelector; 