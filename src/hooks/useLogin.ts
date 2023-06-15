import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {storeUser} from '../redux/slices/user-slice';
import useNameValidation from './useValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const isValidName = useNameValidation(name);

  const handleLoginPress = async () => {
    if (isValidName) {
      try {
        const userId = Math.random().toString(36).substr(2, 5); // Generate a random ID
        await AsyncStorage.setItem('user', JSON.stringify({id: userId, name}));
        dispatch(storeUser(name));
        setId(userId);
      } catch (error) {
        console.error(error);
        alert('Failed to save user data');
      }
    } else {
      alert('Please enter a valid name between 2 to 20 characters');
    }
  };

  return {name, setName, id, handleLoginPress};
};

export default useLogin;
