import {Platform} from 'react-native';
import {filtersStr} from '../constants';

export const nameRegex = /^[A-Za-z]{3,20}$/;
export const amountRegex = /^\d+(\.\d{1,2})?$/;

export const useModalTopPadding = (title: string): number =>
  title === filtersStr
    ? Platform.OS === 'ios'
      ? 210
      : 188
    : Platform.OS === 'ios'
    ? 90
    : 60;

export const useFormattedDate = (dateFilter: Date | null): string => {
  if (dateFilter === null) {
    return '';
  }

  const day = dateFilter.getDate();
  const month = dateFilter.getMonth() + 1;
  const year = dateFilter.getFullYear();

  // Format the date as "dd.mm.yyyy"
  const formatted = `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year.toString()}`;

  return formatted;
};
