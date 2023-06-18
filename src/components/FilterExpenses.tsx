import DateTimePicker from '@react-native-community/datetimepicker';
import React, {FC, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import {
  HIT_SLOP_10,
  cleanString,
  datePH,
  dateStr,
  titlePH,
  titleStr,
} from '../constants';
import {setFilterDate, setFilterTitle} from '../redux/slices/expenses-slice';
import {COLORS} from '../utils/constance';
import Button from './Button';
import {formattedDate} from '../hooks';

interface FilterExpensesProps {
  onFilter: () => void;
  onClearFilters: () => void;
}

const FilterExpenses: FC<FilterExpensesProps> = ({
  onFilter,
  onClearFilters,
}) => {
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChangeDateFilter = (event: Event, value?: Date | undefined) => {
    if (value) {
      setDateFilter(value);
    }
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  const dispatch = useDispatch();

  const handleFilterExpenses = (): void => {
    dispatch(setFilterTitle(titleFilter));
    dispatch(setFilterDate(moment(dateFilter).format('DD.MM.YYYY')));
    onFilter();
  };

  const onClear = (): void => {
    setTitleFilter('');
    setDateFilter(null);
    onClearFilters();
  };

  return (
    <>
      <Text style={styles.inputTitle}>{titleStr}</Text>
      <TouchableOpacity
        style={styles.cleanButton}
        onPress={onClear}
        hitSlop={HIT_SLOP_10}>
        <Text style={styles.cleanText}>{cleanString}</Text>
      </TouchableOpacity>
      <TextInput
        value={titleFilter}
        onChangeText={setTitleFilter}
        placeholder={titlePH}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
      />
      <Text style={styles.inputTitle}>{dateStr}</Text>
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
      )}
      <Button text={'Filter'} onButtonPress={handleFilterExpenses} />
    </>
  );
};

export default FilterExpenses;

const styles = StyleSheet.create({
  cleanButton: {
    width: 120,
  },
  cleanText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -64,
    color: COLORS.primary,
  },
  input: {
    borderBottomWidth: 1,
    color: COLORS.title,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
  inputTitle: {
    color: COLORS.inputTitle,
  },
  dateText: {
    color: COLORS.title,
    padding: 10,
    marginBottom: 50,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
