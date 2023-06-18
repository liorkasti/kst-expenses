import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {HIT_SLOP_10, amountStr, dateStr, titleStr} from '../constants';
import {addExpense} from '../redux/slices/expenses-slice';
import {ExpenseType} from '../redux/types';
import {COLORS} from '../utils/constance';
import Button from './Button';

interface AddExpenseModalProps {
  onClose: () => void;
}

const AddExpense: FC<AddExpenseModalProps> = ({onClose}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      if (title && amount && date) {
        const newExpense: ExpenseType = {
          id: Date.now().toString(),
          title,
          amount: parseFloat(amount),
          date: date,
        };
        // Saving the expense to AsyncStorage
        const savedExpenses = await AsyncStorage.getItem('expenses');
        let localExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
        localExpenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(localExpenses));

        dispatch(addExpense(newExpense));

        setTitle('');
        setAmount('');
        setDate(null);
        onClose();
      }
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  return (
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
      <TouchableOpacity
        style={styles.input}
        onPress={showPicker}
        hitSlop={HIT_SLOP_10}>
        {date ? (
          <Text style={styles.inputTitle}>{formattedDate(date)}</Text>
        ) : (
          <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
            {datePH}
          </Text>
        )}
      </TouchableOpacity>
      {isPickerShow && (
        <DateTimePicker
          value={date || new Date()}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChangeDate}
          style={styles.datePicker}
        />
      )}
      {Platform.OS === 'ios' && isPickerShow && (
        <TouchableOpacity
          style={styles.setButton}
          onPress={() => {
            setIsPickerShow(false);
          }}
          hitSlop={HIT_SLOP_10}>
          <Text style={styles.setText}>Set</Text>
        </TouchableOpacity>
      )}

      <Button onButtonPress={handleCreate} text="Create" />
    </>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    color: COLORS.title,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
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

export default AddExpense;
