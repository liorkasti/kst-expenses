import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStateType } from '../redux/types';
import { storeUser } from '../redux/slices/user-slice';
import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigation from './AppNavigation';

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  const { username } = useSelector((state: RootStateType) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { id, name } = JSON.parse(userData);
          dispatch(storeUser({ id, userName: name }));
        }
      } catch (error) {
        console.log('Error retrieving user data:', error);
      }
    };

    retrieveUserData();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen
          name="AppNavigation"
          component={AppNavigation}
          options={() => ({
            headerShown: true,
            title: `${username}`,
            headerTitleAlign: 'center',
            headerBackVisible: false,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
