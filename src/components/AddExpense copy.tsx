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
import {addExpense} from '../redux/expensesSlice';
import {COLORS} from '../utils/constance';
import Button from './Button';
import BottomModal from './BottomModal';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseModalProps> = ({onClose}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const {expenses} = useSelector(state => state.expenses);

  const handleCreate = async () => {
    try {
      console.log('object :>> ');
      const newExpense: Expense = {
        id: Date.now().toString(),
        title,
        amount: parseFloat(amount),
        date: date,
      };
      // Saving the expense to AsyncStorage
      const savedExpenses = await AsyncStorage.getItem('expenses');
      // console.log({savedExpenses});
      let localExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
      localExpenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(localExpenses));
      // console.log({localExpenses});

      dispatch(addExpense(newExpense));

      setTitle('');
      setAmount('');
      setDate('');
      onClose();
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  return (
    <BottomModal
      style={styles.container}
      onPress={onClose}
      onButtonPress={handleCreate()}>
      <Text style={styles.modalTitle}>Create Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={COLORS.placeholder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor={COLORS.placeholder}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor={COLORS.placeholder}
        value={date}
        onChangeText={setDate}
      />
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: 60 + StatusBar.currentHeight,
    height: '100%',
    width: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 32,
    paddingTop: 50,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 23.25,
    right: 25.25,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
});

export default AddExpense;
