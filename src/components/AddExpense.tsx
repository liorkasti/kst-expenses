import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';

import {amountStr, dateStr, titleStr} from '../constants';
import {addExpense} from '../redux/slices/expenses-slice';
import {Expense} from '../redux/types';
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
        const newExpense: Expense = {
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
      <TextInput
        placeholder={dateStr}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
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
});

export default AddExpense;
