import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const WelcomeScreen = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>WelcomeScreen</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
