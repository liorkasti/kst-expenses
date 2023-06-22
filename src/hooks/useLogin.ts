import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {storeUser} from '../redux/slices/user-slice';
import useInputValidation from './useInputValidation';

const useLogin = () => {
  const {name, setName, validateInputs} = useInputValidation();
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const {id: storedId, name: storedName} = JSON.parse(storedUser);
          setId(storedId);
          setName(storedName);
          dispatch(storeUser({userName: name, id: id}));
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to retrieve user data');
      }
      console.log('name', name);
    };

    fetchUser();
  }, []);

  const handleLoginPress = async () => {
    if (validateInputs()) {
      try {
        const userId = Math.random().toString(36).substr(2, 5); // Generate a random ID
        await AsyncStorage.setItem('user', JSON.stringify({id: userId, name}));
        setId(userId);
        dispatch(storeUser({userName: name, id: id}));
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to save user data');
      }
    } else {
      Alert.alert('Please enter a valid name between 2 to 20 characters');
    }
  };

  return {name, setName, id, handleLoginPress};
};

export default useLogin;
