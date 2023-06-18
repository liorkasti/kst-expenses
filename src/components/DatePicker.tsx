import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {};

const DatePicker = (props: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={showPicker}
        hitSlop={HIT_SLOP_10}>
        {dateFilter ? (
          <Text style={styles.inputTitle}>{formattedDate(dateFilter)}</Text>
        ) : (
          <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
            {datePH}
          </Text>
        )}
      </TouchableOpacity>
      {isPickerShow && (
        <DateTimePicker
          value={dateFilter || new Date()}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChangeDateFilter}
          style={styles.datePicker}
        />
      )}
      {Platform.OS === 'ios' && isPickerShow && (
        <TouchableOpacity
          style={styles.setButton}
          onPress={() => {
            setIsPickerShow(false);
          }}
          hitSlop={HIT_SLOP_10}>
          <Text style={styles.setText}>Set</Text>
        </TouchableOpacity>
      )}{' '}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
