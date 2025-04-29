import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

type SearchBarProps = {
  onSearch?: (text: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = "Buscar discotecas o ubicaciones" 
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleClear = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.subtext}
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius * 3,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 0.8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  searchIcon: {
    fontSize: SIZES.medium,
    marginRight: SIZES.padding,
  },
  clearIcon: {
    fontSize: SIZES.medium,
    color: COLORS.subtext,
    padding: 5,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
});

export default SearchBar;
