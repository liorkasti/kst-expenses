import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setFilterDate, setFilterTitle} from '../redux/slices/expenses-slice';
import Button from './Button';
import {COLORS} from '../utils/constance';

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
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(dateFilter));
  };

  return (
    <>
      <TouchableOpacity onPress={onClearFilters}>
        <Text style={styles.cleanText}>Clear Filters</Text>
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Filter</Text>
      <Text>Filter by Title:</Text>
      <TextInput
        value={titleFilter}
        onChangeText={setTitleFilter}
        placeholder="Enter title"
        style={styles.input}
      />

      <Text>Filter by Date:</Text>
      <TextInput
        value={dateFilter}
        onChangeText={setDateFilter}
        placeholder="Enter date"
        style={styles.input}
      />

      <Button text={'Filter'} onButtonPress={handleFilterExpenses} />
    </>
  );
};

export default ExpensesFiltersModal;

const styles = StyleSheet.create({
  cleanText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -30,
    color: COLORS.primary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: -30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
});
