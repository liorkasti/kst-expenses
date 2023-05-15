import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpense} from '../redux/actions';
import {Expense} from '../redux/types';

import {COLOR} from '../utils/constance';
import close from '../assets/close.png';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseModalProps> = ({onClose}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleCreate = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      date: new Date(date),
    };
    dispatch(addExpense(newExpense));
    setTitle('');
    setAmount('');
    setDate('');
    onClose();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalContainer}
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
          placeholderTextColor={COLOR.placeholder}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor={COLOR.placeholder}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor={COLOR.placeholder}
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
    backgroundColor: COLOR.thirdary,
    paddingHorizontal: 52,
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 61,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddExpense;
