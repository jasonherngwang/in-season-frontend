export type User = {
  id: string;
  username: string;
  foods: Food[];
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
  food: Food;
  acquired: boolean;
};

export type Basket = {
  id: string;
  name: string;
  owner?: string;
  foods?: Food[];
};

// Object used for filtering lists of foods
export type FilterParams = {
  filterTerm: string;
  showVegetable: boolean;
  showFruit: boolean;
  showOther: boolean;
};
