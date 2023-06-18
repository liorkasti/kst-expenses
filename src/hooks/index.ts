export const formattedDate = (dateFilter: Date | null): string => {
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
