import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

interface Props {
  onFilter: (filter: string, filterValue: string) => void;
  onClearFilters: () => void;
}

const ExpensesFiltersModal: React.FC<Props> = ({onFilter, onClearFilters}) => {
  // State variables to store the filter values
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  return (
    <View>
      <Text>Filter by Title:</Text>
      <TextInput
        value={titleFilter}
        onChangeText={setTitleFilter}
        placeholder="Enter title"
      />

      <Text>Filter by Date:</Text>
      <TextInput
        value={dateFilter}
        onChangeText={setDateFilter}
        placeholder="Enter date"
      />

      <TouchableOpacity onPress={() => onFilter('title', titleFilter)}>
        <Text>Filter title</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onFilter('date', dateFilter)}>
        <Text>Filter date</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClearFilters}>
        <Text>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesFiltersModal;
