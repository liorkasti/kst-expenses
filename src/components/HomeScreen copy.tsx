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
import {deleteExpense} from '../redux/expensesSlice';
import {Expense} from '../redux/types';
import {COLORS} from '../utils/constance';
import ExpensesFiltersModal from './ExpensesFiltersModal';
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];
interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([] as Expense[]);

  const {expenses} = useSelector(state => state.expenses);

  useEffect(() => {
    filterExpenses();
    // console.log({expenses, filteredExpenses});
  }, [expenses, filteredExpenses]);

  const filterExpenses = () => {
    if (filteredExpenses === '') {
      setFilteredExpenses(expenses);
      return;
    }
  };

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

  //TODO: add slice to filter expenses based on title or date
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

  const handleClearFilters = () => {
    setFilteredExpenses([]);
    setShowFiltersModal(false);
  };

  // Function to render each expense item
  const renderExpenseItem = ({item}: {item: Expense}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
          <Image
            source={closeIcon}
            style={{width: 20, height: 20, marginRight: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.paymentTitle}>{item.title}</Text>
        {/* <Text style={styles.paymentTitle}>{item.amount}</Text>
        <Text style={styles.paymentTitle}>{item.date}</Text> */}
      </View>
    );
  };

  // TODO: Function to render each section header
  const renderSectionHeader = ({
    section: {item},
  }: {
    section: {item: string};
  }) => {
    // console.log('item.date :>> ', item.date.toString());
    return <Text style={styles.sectionHeader}>{item}</Text>;
  };

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

      {/* <FlatList
        data={expenses}
        sections={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={expenseKeyExtractor}
        renderSectionHeader={renderSectionHeader}
      /> */}
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
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
