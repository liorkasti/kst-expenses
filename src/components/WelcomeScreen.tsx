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

import {COLOR} from '../utils/constance';

interface WelcomeScreenProps {
  onSaveName: (name: string, id: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  navigation,
  onSaveName,
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
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor={COLOR.placeholder}
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
    borderColor: COLOR.thirdary,
    borderRadius: 3,
    paddingTop: 28,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    backgroundColor: COLOR.thirdary,
    paddingHorizontal: 52,
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 61,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
  },
});

export default WelcomeScreen;
