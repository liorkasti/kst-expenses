import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from './Button';
import {setFilterDate, setFilterTitle} from '../redux/expensesSlice';

interface Props {
  // onFilter: () => void;
  onClearFilters: () => void;
}

const ExpensesFiltersModal: React.FC<Props> = ({onClearFilters}) => {
  // State variables to store the filter values
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);

  const dispatch = useDispatch();

  const handleFilterExpenses = () => {
    console.log({titleFilter, dateFilter});
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(dateFilter));
  };

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

      <Button text={'Filter'} onButtonPress={handleFilterExpenses} />

      <TouchableOpacity onPress={onClearFilters}>
        <Text>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesFiltersModal;
