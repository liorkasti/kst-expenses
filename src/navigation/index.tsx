import React, {useState, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import WelcomeScreen from '../components/WelcomeScreen';
import AppNavigation from './AppNavigation';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  const {username} = useSelector(state => state.reducers);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen
          name="AppNavigation"
          component={AppNavigation}
          options={() => ({
            headerShown: true,
            title: `${username}`,
            headerTitleAlign: 'center',
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
