import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {storeUser} from '../redux/userReducer';
import {COLORS} from '../utils/constance';
import Button from './Button';

interface WelcomeScreenProps {
  onSaveName: (name: string, id: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  navigation,
  onSaveName,
}) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleLoginPress = async () => {
    const isValidName = /^[A-Za-z]{2,20}$/.test(name);
    if (isValidName) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({name}));
        dispatch(storeUser(name));
        // onSaveName(name, Math.random().toString(36).substr(2, 5));
        navigation.navigate('AppNavigation');
      } catch (error) {
        console.error(error);
        alert('Failed to save user data');
      }
    } else {
      alert('Please enter a valid name between 2 to 20 characters');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor={COLORS.placeholder}
        value={name}
        onChangeText={setName}
      />
      <Button onButtonPress={handleLoginPress} text="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.thirdary,
    borderRadius: 3,
    paddingTop: 28,
    paddingBottom: 9,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
  },
});

export default WelcomeScreen;
