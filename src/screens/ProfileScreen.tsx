import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {signOutStr, totalExpensesItemsStr} from '../constants';
import {removeUser} from '../redux/slices/user-slice';
import {RootStateType} from '../redux/types';
import {RootStackParamListType} from '../redux/types';
import {COLORS} from '../constants/theme';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamListType,
    'ProfileScreen'
  >;
};

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const {expenses} = useSelector((state: RootStateType) => state.expenses);

  const handleSignout = () => {
    dispatch(removeUser());
    navigation.navigate('WelcomeScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalLine}>
        <Text style={styles.text}>{totalExpensesItemsStr}</Text>
        <Text style={styles.total}>{expenses.length}</Text>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.text}>{signOutStr}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  //TODO: add custom styles in theme.tsx
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: -20,
  },
});

export default ProfileScreen;
