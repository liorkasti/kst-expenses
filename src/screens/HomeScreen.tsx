import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import closeIcon from '../assets/close.png';
import filterIcon from '../assets/filter.png';
import BottomModal from '../components/BottomModal';
import FilterExpenses from '../components/FilterExpenses';
import {filterStr, filtersStr, totalExpensesStr} from '../constants';
import {
  deleteExpense,
  filteredData,
  setFilterDate,
  setFilterTitle,
} from '../redux/slices/expenses-slice';
import {RootStateType} from '../redux/types';
import {ExpenseType, ExpenseSectionType} from '../redux/types';
import {COLORS} from '../utils/constance';
import moment from 'moment';

const HomeScreen = () => {
  const filteredExpensesRef = useRef([] as ExpenseType[]);
  const [isFiltersModalVisible, setFiltersModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {expenses, filters} = useSelector(
    (state: RootStateType) => state.expenses,
  );

  const handleDeleteExpense = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
    updateLocalStorage();
  };

  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.log('Error updating local storage:', error);
    }
  };

  const handleClearFilters = () => {
    dispatch(setFilterTitle(''));
    dispatch(setFilterDate(null));
  };

  const handleFilteredExpenses = () => {
    let filteredExpenses = expenses;
    const {title, date} = filters;

    if (title && date) {
      filteredExpenses = filteredExpenses.filter(
        expense =>
          expense?.date === date &&
          expense.title.toLowerCase().includes(title.toLowerCase()),
      );
    } else if (title) {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense.title.toLowerCase().includes(title.toLowerCase()),
      );
    } else if (date) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense?.date === date,
      );
    }
    if (filteredExpenses.length > 0) {
      filteredExpensesRef.current = filteredExpenses;
    } else {
      filteredExpensesRef.current = expenses;
    }
  };

  const renderExpenseSections = () => {
    handleFilteredExpenses();
    const expenseSections: ExpenseSectionType[] = [];
    let currentSection: {title: string; data: ExpenseType[]} | null = null;

    filteredExpensesRef.current.forEach(expense => {
      const expenseDate = expense.date;
      if (!currentSection || currentSection.title !== expenseDate) {
        currentSection = {title: expenseDate, data: [expense]};
        expenseSections.push(currentSection);
      } else {
        currentSection.data.push(expense);
      }
    });

    return (
      <SectionList
        sections={expenseSections}
        keyExtractor={(item, index) => item.id + index}
        ItemSeparatorComponent={() => (
          <View style={{borderBottomWidth: 0.25}} />
        )}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              height: 62,
            }}>
            <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
              <Image
                source={closeIcon}
                style={{width: 20, height: 20, marginRight: 10}}
              />
            </TouchableOpacity>
            <Text style={styles.paymentTitle}>{item.title}</Text>
            <Text style={styles.paymentTitle}>{item.amount}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topWrapper}>
          <Text style={styles.totalTile}>
            {totalExpensesStr}
            {expenses.reduce((total, expense) => total + expense.amount, 0)}
          </Text>

          <View style={styles.filterWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFiltersModalVisible(!isFiltersModalVisible)}>
              <Image source={filterIcon} style={styles.containerIcon} />
              <Text style={styles.filterText}>{filterStr}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderExpenseSections()}
      </View>
      {isFiltersModalVisible && (
        <BottomModal
          title={filtersStr}
          visible={isFiltersModalVisible}
          onClose={() => setFiltersModalVisible(!isFiltersModalVisible)}>
          <FilterExpenses
            onFilter={() => setFiltersModalVisible(!isFiltersModalVisible)}
            onClearFilters={handleClearFilters}
          />
        </BottomModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topWrapper: {paddingHorizontal: 16},
  totalTile: {
    color: COLORS.title,
    paddingRight: 3,
    paddingTop: 19,
    fontWeight: '400',
    fontSize: 17,
  },
  filterWrapper: {
    alignItems: 'flex-end',
    paddingTop: 37,
    paddingBottom: 11,
  },
  containerIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  filterButton: {
    flexDirection: 'row',
    marginRight: 11,
    paddingVertical: 4,
    paddingHorizontal: 13,
    backgroundColor: COLORS.filter,
    borderRadius: 60,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.title,
  },
  paymentTitle: {
    color: '#3E3E3E',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 31.5,
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  sectionHeader: {
    color: COLORS.title,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#F4EEEE',
    fontWeight: '400',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
