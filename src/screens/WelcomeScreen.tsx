import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {storeUser} from '../redux/slices/user-slice';
import {COLORS} from '../utils/constance';
import Button from '../components/Button';
import useLogin from '../hooks/useLogin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../redux/types';

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeScreen'>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const {name, setName, id, handleLoginPress} = useLogin();

  useEffect(() => {
    navigation.navigate('AppNavigation');
  }, [id, navigation]);

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
    backgroundColor: COLORS.bkg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    backgroundColor: COLORS.inputBkg,
    borderWidth: 1,
    borderColor: COLORS.thirdary,
    color: COLORS.thirdary,
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
