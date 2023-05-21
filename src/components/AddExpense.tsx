import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Expense} from '../redux/types';
import {addExpense} from '../redux/expensesSlice';
import {COLORS} from '../utils/constance';
import close from '../assets/close.png';

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
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onClose}>
      <TouchableOpacity style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={close}
            style={{
              width: 13.5,
              height: 13.5,
            }}
          />
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: 60,
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
  createButton: {
    position: 'absolute',
    left: 114,
    right: 114,
    backgroundColor: COLORS.thirdary,
    paddingHorizontal: 52,
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 61,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AddExpense;
