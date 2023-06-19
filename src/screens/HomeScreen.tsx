import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {
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
import ExpenseEditor from '../components/ExpenseEditor';
import {
  clearFilterString,
  filtersStr,
  filterStr,
  HIT_SLOP_10,
  totalExpensesStr,
} from '../constants';
import {clearFilterData, deleteExpense} from '../redux/slices/expenses-slice';
import {ExpenseSectionType, ExpenseType, RootStateType} from '../redux/types';
import {COLORS} from '../utils/constance';

const HomeScreen = () => {
  const filteredExpensesRef = useRef([] as ExpenseType[]);
  const [isFiltersModalVisible, setFiltersModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {expenses, filteredData} = useSelector(
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

  const handleFilteredExpenses = () => {
    if (filteredData.length > 0) {
      filteredExpensesRef.current = filteredData;
    } else {
      clearFilterData();
      filteredExpensesRef.current = expenses;
    }
  };

  const onClear = (): void => {
    dispatch(clearFilterData());
    filteredExpensesRef.current = expenses;
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
    //TODO: screen a label of the filters chosen with a remove badge on them
    return (
      <SectionList
        sections={expenseSections}
        keyExtractor={(item, index) => item.id + index}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
              <Image source={closeIcon} style={styles.removeIcon} />
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
            {filteredData.length > 0 && (
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={onClear}
                hitSlop={HIT_SLOP_10}>
                <Text style={styles.clearFilterText}>{clearFilterString}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {renderExpenseSections()}
      </View>
      {isFiltersModalVisible && (
        <BottomModal
          title={filtersStr}
          visible={isFiltersModalVisible}
          onClose={() => setFiltersModalVisible(!isFiltersModalVisible)}>
          <ExpenseEditor
            isFilterEditor={true}
            onClose={() => setFiltersModalVisible(!isFiltersModalVisible)}
          />
        </BottomModal>
      )}
    </>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topWrapper: {paddingHorizontal: 16},
  separator: {borderBottomWidth: 0.25},
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 62,
  },
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
  removeIcon: {width: 20, height: 20, marginRight: 10},
  clearFilterButton: {},
  clearFilterText: {
    padding: 10,
    color: COLORS.thirdary,
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
