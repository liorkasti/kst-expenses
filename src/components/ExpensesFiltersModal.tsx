import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {setFilterDate, setFilterTitle} from '../redux/slices/expenses-slice';
import Button from './Button';
import {COLORS} from '../utils/constance';
import {HIT_SLOP_10, dateStr, titleStr} from '../constants';

interface Props {
  // onFilter: () => void;
  onClearFilters: () => void;
}

const ExpensesFiltersModal: React.FC<Props> = ({onClearFilters}) => {
  // State variables to store the filter values
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const cleanString = 'clean';
  const titlePH = 'Enter title:';
  const datePH = 'Enter date:';

  const dispatch = useDispatch();

  const handleFilterExpenses = () => {
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(dateFilter));
  };

  const onClear = () => {
    setTitleFilter('');
    setDateFilter(null);
    onClearFilters;
  };

  return (
    <>
      <Text style={styles.inputTitle}>{titleStr}</Text>
      <TouchableOpacity
        style={styles.cleanButton}
        onPress={onClear}
        hitSlop={HIT_SLOP_10}>
        <Text style={styles.cleanText}>{cleanString}</Text>
      </TouchableOpacity>
      <TextInput
        value={titleFilter}
        onChangeText={setTitleFilter}
        placeholder={titlePH}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
      />
      <Text style={styles.inputTitle}>{dateStr}</Text>
      <TextInput
        value={dateFilter}
        onChangeText={setDateFilter}
        placeholder={datePH}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
      />

      <Button text={'Filter'} onButtonPress={handleFilterExpenses} />
    </>
  );
};

export default ExpensesFiltersModal;

const styles = StyleSheet.create({
  cleanButton: {
    width: 120,
  },
  cleanText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -64,
    color: COLORS.primary,
  },
  input: {
    borderBottomWidth: 1,
    color: COLORS.title,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
  inputTitle: {
    color: COLORS.inputTitle,
  },
});
