import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../components/HomeScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import AddExpenseModal from '../components/AddExpenseModal';
import plus from '../assets/plusExpense.png';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Text style={{color: focused ? '#455EFF' : '#696969'}}>Home</Text>
            ),
          }}
        />
        <Tab.Screen
          name={'ActionButton'}
          component={AddExpenseModal}
          options={{
            tabBarIcon: ({focused}) => (
              <TouchableOpacity>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: '#455EFF',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: Platform.OS == 'android' ? 50 : 30,
                  }}>
                  <Image
                    source={plus}
                    style={{
                      width: 32,
                      height: 32,
                      tintColor: 'white',
                    }}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Text style={{color: focused ? '#455EFF' : '#696969'}}>
                Profile
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigation;
