import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
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
import {
  setFilterTitle,
  setFilterDate,
  deleteExpense,
} from '../redux/expensesReducer';
import {Expense} from '../redux/types';
import {COLORS} from '../utils/constance';
import ExpensesFiltersModal from './ExpensesFiltersModal';

interface Props {}

const HomeScreen = () => {
  const [isFiltersModalVisible, setFiltersModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {expenses, filters} = useSelector(state => state.expenses);
  console.log('filters :>> ', filters);

  // Function to handle deleting an expense
  const handleDeleteExpense = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
    updateLocalStorage();
  };

  // Function to update the expenses in local storage
  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.log('Error updating local storage:', error);
    }
  };

  const handleClearFilters = () => {
    setFilteredExpenses([]);
    setShowFiltersModal(false);
  };

  const handleFilterExpenses = () => {
    // Dispatch the actions to set the filter values
    dispatch(setFilterTitle(filters.title));
    dispatch(setFilterDate(filters.date));
  };

  // Render each expense section based on the filtered expenses
  const renderExpenseSections = () => {
    // Apply filters to the expenses based on the filter values
    let filteredExpenses = expenses;
    if (filters.title) {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense.title.toLowerCase().includes(filters.title.toLowerCase()),
      );
    }
    if (filters.date) {
      filteredExpenses = filteredExpenses.filter(
        expense =>
          expense.date.getFullYear() === filters.date!.getFullYear() &&
          expense.date.getMonth() === filters.date!.getMonth() &&
          expense.date.getDate() === filters.date!.getDate(),
      );
    }

    // Group the expenses by date
    const expenseSections = [];
    let currentSection: {title: string; data: Expense[]} | null = null;

    filteredExpenses.forEach(expense => {
      const expenseDate = expense.date;
      // const expenseDate = expense.date.toDateString();
      if (!currentSection || currentSection.title !== expenseDate) {
        // Create a new section
        currentSection = {title: expenseDate, data: [expense]};
        expenseSections.push(currentSection);
      } else {
        // Add the expense to the current section
        currentSection.data.push(expense);
      }
    });

    return (
      <SectionList
        sections={expenseSections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalTile}>
        Total Expenses:{' '}
        {expenses.reduce((total, expense) => total + expense.amount, 0)}
      </Text>

      <View style={styles.filterWrapper}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFiltersModalVisible(!isFiltersModalVisible)}>
          <Image source={filterIcon} style={styles.containerIcon} />
          <Text style={styles.leftText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {isFiltersModalVisible && (
        <ExpensesFiltersModal
          onFilter={handleFilterExpenses}
          onClearFilters={handleClearFilters}
        />
      )}

      {renderExpenseSections()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  totalTile: {
    paddingLeft: 25,
    paddingRight: 3,
    paddingTop: 19,
    fontWeight: '400',
    fontSize: 17,
  },
  filterWrapper: {
    alignItems: 'flex-end',
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
  leftText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
