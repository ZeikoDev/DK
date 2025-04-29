import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

interface DateTimeSelectorProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  onTimeChange?: (time: string) => void;
}

const TIMES = [
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
];

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  initialDate = new Date(),
  onDateChange,
  onTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState('22:00');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  // Función para mostrar las próximas fechas (7 días)
  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTimeForDisplay = (time: string) => {
    // Convertir el formato 24h a 12h con AM/PM
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);

    if (hourNum === 0) {
      return `12:${minute} AM`;
    } else if (hourNum < 12) {
      return `${hourNum}:${minute} AM`;
    } else if (hourNum === 12) {
      return `12:${minute} PM`;
    } else {
      return `${hourNum - 12}:${minute} PM`;
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setDateModalVisible(false);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setTimeModalVisible(false);
    if (onTimeChange) {
      onTimeChange(time);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.dateSelector} onPress={() => setDateModalVisible(true)}>
          <Text style={styles.dateIcon}>📅</Text>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.timeSelector} onPress={() => setTimeModalVisible(true)}>
          <Text style={styles.timeIcon}>🕙</Text>
          <Text style={styles.timeText}>{formatTimeForDisplay(selectedTime)}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar fecha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Fecha</Text>
              <TouchableOpacity
                onPress={() => setDateModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {getNextWeekDates().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    selectedDate.toDateString() === date.toDateString() &&
                      styles.selectedOptionItem,
                  ]}
                  onPress={() => handleSelectDate(date)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedDate.toDateString() === date.toDateString() &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar hora */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Hora</Text>
              <TouchableOpacity
                onPress={() => setTimeModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {TIMES.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionItem, selectedTime === time && styles.selectedOptionItem]}
                  onPress={() => handleSelectTime(time)}
                >
                  <Text
                    style={[styles.optionText, selectedTime === time && styles.selectedOptionText]}
                  >
                    {formatTimeForDisplay(time)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateIcon: {
    fontSize: SIZES.medium,
    marginRight: SIZES.padding / 2,
  },
  dateText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeIcon: {
    fontSize: SIZES.medium,
    marginRight: SIZES.padding / 2,
  },
  timeText: {
    color: COLORS.text,
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
  optionItem: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
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

export default DateTimeSelector;
