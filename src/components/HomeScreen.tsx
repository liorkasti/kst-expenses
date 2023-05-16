import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {deleteExpense} from '../redux/expensesReducer';
import ExpensesFiltersModal from './ExpensesFiltersModal';
import closeIcon from '../assets/close.png';
import filterIcon from '../assets/filter.png';
import {COLORS} from '../utils/constance';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([] as Expense[]);

  const {expenses} = useSelector(state => state.expenses);

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

  // Function to filter expenses based on title or date
  const handleFilterExpenses = (filter: string, filterValue: string) => {
    let filteredList = expenses;

    if (filter === 'title') {
      filteredList = filteredList.filter(expense =>
        expense.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    } else if (filter === 'date') {
      filteredList = filteredList.filter(expense => {
        const expenseDate = new Date(expense.date);
        const filterDate = new Date(filterValue);

        return (
          expenseDate.getFullYear() === filterDate.getFullYear() &&
          expenseDate.getMonth() === filterDate.getMonth() &&
          expenseDate.getDate() === filterDate.getDate()
        );
      });
    }

    setFilteredExpenses(filteredList);
    setShowFiltersModal(false);
  };

  // Function to clear the applied filters
  const handleClearFilters = () => {
    setFilteredExpenses([]);
    setShowFiltersModal(false);
  };

  // Function to render each expense item
  const renderExpenseItem = ({item}: {item: Expense}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
        <Image
          source={closeIcon}
          style={{width: 20, height: 20, marginRight: 10}}
        />
      </TouchableOpacity>
      <Text>{item.title}</Text>
    </View>
  );

  // Function to render each section header
  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
      {title}
    </Text>
  );

  // Function to define the key for each expense item
  const expenseKeyExtractor = (item: Expense) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.totalTile}>
        Total Expenses:{' '}
        {expenses.reduce((total, expense) => total + expense.amount, 0)}
      </Text>

      <View style={styles.filterWrapper}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFiltersModal(true)}>
          <Image source={filterIcon} style={styles.containerIcon} />
          <Text style={styles.leftText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExpenses.length > 0 ? filteredExpenses : expenses}
        renderItem={renderExpenseItem}
        keyExtractor={expenseKeyExtractor}
        renderSectionHeader={renderSectionHeader}
      />

      {showFiltersModal && (
        <ExpensesFiltersModal
          onFilter={handleFilterExpenses}
          onClearFilters={handleClearFilters}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
export default HomeScreen;
