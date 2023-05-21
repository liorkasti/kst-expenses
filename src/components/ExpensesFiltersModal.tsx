import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from './Button';
import {setFilterDate, setFilterTitle} from '../redux/expensesSlice';

interface Props {
  onFilter: () => void;
  onClearFilters: () => void;
}

const ExpensesFiltersModal: React.FC<Props> = ({onFilter, onClearFilters}) => {
  // State variables to store the filter values
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const dispatch = useDispatch();

  console.log({titleFilter, dateFilter});
  useCallback(() => {
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(dateFilter));
  }, [dateFilter, dispatch, titleFilter]);

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

      <Button text={'Filter'} onButtonPress={onFilter} />

      <TouchableOpacity onPress={onClearFilters}>
        <Text>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesFiltersModal;
