import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Expense} from '../redux/types';
import {addExpense} from '../redux/slices/expenses-slice';
import {COLORS} from '../utils/constance';
import close from '../assets/close.png';
import Button from './Button';
import {amountStr, dateStr, titleStr} from '../constants';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseModalProps> = ({onClose}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();
  const {expenses} = useSelector(state => state.expenses);

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
