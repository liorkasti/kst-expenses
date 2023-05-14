import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './AppNavigation';
import {COLOR} from '../utils/constance';

interface WelcomeScreenProps {
  onSaveName: (name: string, id: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSaveName,
  navigation,
}) => {
  const [name, setName] = useState('');

  const handleLoginPress = async () => {
    const isValidName = /^[A-Za-z]{3,20}$/.test(name);
    if (isValidName) {
      try {
        // const response = await axios.post('http://localhost:3000/users', {
        //   name,
        // });
        // const {id} = response.data;
        await AsyncStorage.setItem('user', JSON.stringify({name}));
        // onSaeName(name, id);
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
      <Text style={styles.title}>Welcome to My App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    backgroundColor: COLOR.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    bottom: 61,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WelcomeScreen;
