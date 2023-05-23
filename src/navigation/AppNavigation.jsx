import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import plus from '../assets/plusExpense.png';
import AddExpense from '../components/AddExpense';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import BottomModal from '../components/BottomModal';
import {COLORS} from '../utils/constance';

const Tab = createBottomTabNavigator();

const AppNavigation = ({navigation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={'AddExpense'}
        component={AddExpense}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <TouchableOpacity onPress={handleOpenModal}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: COLORS.primary,
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

              <BottomModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
                modalsize={60}>
                <AddExpense onClose={handleCloseModal} />
              </BottomModal>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
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
