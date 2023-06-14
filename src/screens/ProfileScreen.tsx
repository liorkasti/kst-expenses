import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {removeUser} from '../redux/slices/user-slice';
import {
  NavigationContainerProps,
  useNavigation,
} from '@react-navigation/native';
import {signOutStr, totalExpensesStr} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../utils/constance';

type Props = {
  navigation: NavigationContainerProps;
};

const ProfileScreen = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {expenses, filters} = useSelector(state => state.expenses);

  const handleSignout = () => {
    dispatch(removeUser());
    navigation.navigate('WelcomeScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalLine}>
        <Text style={styles.text}>{totalExpensesStr}</Text>
        <Text style={styles.total}>
          {expenses.reduce((total, expense) => total + expense.amount, 0)}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginTop: -20,
        }}
      />
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.text}>{signOutStr}</Text>
      </TouchableOpacity>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginTop: -20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.bkg,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 30,
    fontWeight: '400',
    fontSize: 17,
    color: COLORS.title,
  },
  total: {
    paddingVertical: 30,
    fontWeight: '700',
    fontSize: 17,
    color: COLORS.title,
  },
});

export default ProfileScreen;
