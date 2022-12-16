// null when logged out
export type User = {
  username: string;
  token: string;
} | null;

export type MonthsInSeason = Record<string, boolean>;

export type Food = {
  id: string;
  name: string;
  category: string;
  months: MonthsInSeason;
  description?: string;
  imageUrl?: string;
};

export type BasketFood = {
  id: string;
  food: Food;
  acquired: boolean;
};

// Object used for filtering lists of foods
export type FilterParams = {
  filterTerm: string;
  showVegetable: boolean;
  showFruit: boolean;
  showOther: boolean;
};
