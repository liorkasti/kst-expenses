import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {
  amountStr,
  cleanString,
  createStr,
  datePH,
  dateStr,
  filterStr,
  HIT_SLOP_10,
  titlePH,
  titleStr,
} from '../constants';
import useInputValidation from '../hooks/useInputValidation';
import {
  addExpense,
  clearFilters,
  filterExpenses,
  setFilterDate,
  setFilterTitle,
} from '../redux/slices/expenses-slice';
import {ExpenseType} from '../redux/types';
import {COLORS} from '../constants/theme';
import Button from './Button';

interface ExpenseEditorProps {
  onClose: () => void;
  isFilterEditor: boolean;
}

const ExpenseEditor: FC<ExpenseEditorProps> = ({onClose, isFilterEditor}) => {
  const {
    title,
    setTitle,
    amount,
    setAmount,
    titleError,
    amountError,
    validateInputs,
  } = useInputValidation();
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const dispatch = useDispatch();

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showPicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleCreate = async () => {
    try {
      if (titleError) {
        Alert.alert(titleError);
      }
      if (amountError) {
        Alert.alert(amountError);
      }
      if (validateInputs() && title && amount && date) {
        const newExpense: ExpenseType = {
          id: Date.now().toString(),
          title,
          amount: parseFloat(amount),
          date,
        };
        //TODO: date validation into hook
        if (date) {
        } else {
          Alert.alert('Invalid date');
        }
        // Saving the expense to AsyncStorage
        const savedExpenses = await AsyncStorage.getItem('expenses');
        let localExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
        localExpenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(localExpenses));

        dispatch(addExpense(newExpense));
        setTitle('');
        setAmount('');
        onClose();
      }
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  const handleConfirm = (value: Date | undefined) => {
    if (value) {
      setDate(moment(value).format('DD.MM.YYYY'));
    }
    hideDatePicker();
  };

  const handleFilterExpenses = (): void => {
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(date));
    dispatch(filterExpenses());
    onClose();
    dispatch(clearFilters());
  };

  const onClear = (): void => {
    setTitleFilter('');
    setDate('');
    dispatch(clearFilters());
  };

  return (
    <>
      {isFilterEditor ? (
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
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder={titleStr}
            placeholderTextColor={COLORS.placeholder}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder={amountStr}
            placeholderTextColor={COLORS.placeholder}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </>
      )}
      <TouchableOpacity
        style={styles.input}
        onPress={showPicker}
        hitSlop={HIT_SLOP_10}>
        {date ? (
          <Text style={styles.inputTitle}>{date}</Text>
        ) : (
          <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
            {datePH}
          </Text>
        )}
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          style={styles.datePicker}
        />
      )}
      <Button
        text={isFilterEditor ? filterStr : createStr}
        onButtonPress={isFilterEditor ? handleFilterExpenses : handleCreate}
      />
    </>
  );
};

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
  dateText: {
    color: COLORS.title,
    padding: 10,
    marginBottom: 50,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default ExpenseEditor;
