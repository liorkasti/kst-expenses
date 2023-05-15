import React, {useState} from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpense} from '../redux/expenses/actions';
import {Expense} from '../redux/expenses/types';
import {AddExpense} from './AddExpense';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}
const AddExpenseModal: React.FC<AddExpenseModalProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  console.log({isModalOpen});
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={handleCloseModal}
      animationType="slide">
      <AddExpense onClose={handleCloseModal} />
    </Modal>
  );
};

export default AddExpenseModal;
