import { MonthsInSeason } from '../types';

const defaultSeasonality: MonthsInSeason = {
  '0': false,
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
  '9': false,
  '10': false,
  '11': false,
};

const monthNumToAbbr = (monthNum: number) => {
  const date = new Date();
  date.setMonth(monthNum);

  return {
    shortName: date.toLocaleString('default', { month: 'short' }),
    fullName: date.toLocaleString('default', { month: 'long' }),
  };
};

export default { defaultSeasonality, monthNumToAbbr };
