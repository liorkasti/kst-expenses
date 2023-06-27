import React, {FC, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../components/Button';
import useLogin from '../hooks/useLogin';
import {RootStackParamListType} from '../redux/types';
import {COLORS} from '../constants/theme';

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamListType,
    'WelcomeScreen'
  >;
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {
  const {name, setName, id, handleLoginPress} = useLogin();

  useEffect(() => {
    if (id !== '') {
      navigation.navigate('AppNavigation');
    }
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
  //TODO: add custom styles in theme.tsx
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
