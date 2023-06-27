import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {closeIcon, filterIcon} from '../assets';
import BottomModal from '../components/BottomModal';
import ExpenseEditor from '../components/ExpenseEditor';
import {
  clearFilterData,
  deleteExpense,
  updateLocalStorage,
} from '../redux/slices/expenses-slice';
import {ExpenseSectionType, ExpenseType, RootStateType} from '../redux/types';
import {COLORS} from '../constants/theme';
import {HIT_SLOP_10} from '../constants';

const HomeScreen = () => {
  const filteredExpensesRef = useRef([] as ExpenseType[]);
  const [isFiltersModalVisible, setFiltersModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {expenses, filteredData} = useSelector(
    (state: RootStateType) => state.expenses,
  );

  const handleDeleteExpense = useCallback(
    async (expenseId: string) => {
      dispatch(deleteExpense(expenseId));
    },
    [dispatch],
  );

  useEffect(() => {
    updateLocalStorage(expenses);
  }, [expenses]);

  const onClear = useCallback(() => {
    dispatch(clearFilterData());
    filteredExpensesRef.current = expenses;
  }, [dispatch, expenses]);

  const renderExpenseItem = useCallback(
    ({item}: {item: ExpenseType}) => (
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
          <Image source={closeIcon} style={styles.removeIcon} />
        </TouchableOpacity>
        <Text style={styles.paymentTitle}>{item.title}</Text>
        <Text style={styles.paymentTitle}>{item.amount}</Text>
      </View>
    ),
    [handleDeleteExpense],
  );

  const renderSectionHeader = useCallback(
    ({section: {title}}: {section: {title: string}}) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    ),
    [],
  );

  const expenseSections = useMemo(() => {
    filteredExpensesRef.current =
      filteredData.length > 0 ? filteredData : expenses;

    const sections: ExpenseSectionType[] = [];
    let currentSection: {title: string; data: ExpenseType[]} | null = null;

    filteredExpensesRef.current.forEach(expense => {
      const expenseDate = expense.date;
      if (!currentSection || currentSection.title !== expenseDate) {
        currentSection = {title: expenseDate, data: [expense]};
        sections.push(currentSection);
      } else {
        currentSection.data.push(expense);
      }
    });

    return sections;
  }, [expenses, filteredData]);

  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topWrapper}>
          <Text style={styles.totalTile}>Total Expenses: {totalExpenses}</Text>

          <View style={styles.filterWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFiltersModalVisible(!isFiltersModalVisible)}>
              <Image source={filterIcon} style={styles.containerIcon} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
            {filteredData.length > 0 && (
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={onClear}
                hitSlop={HIT_SLOP_10}>
                <Text style={styles.clearFilterText}>Clear Filter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <SectionList
          sections={expenseSections}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={Separator}
          renderItem={renderExpenseItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
      {isFiltersModalVisible && (
        <BottomModal
          title="Filters"
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
