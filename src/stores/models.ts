export interface Recipe {
  key: number;
  tit: string;
  cat: string;
  ing: [[string]];
  sub?: string;
  isFiltered: boolean;
}

export interface Category {
  key: number;
  name: string;
  icon: string;
  isSelected: boolean;
  subs: [string];
}

export interface Ingredient {
  0: string;
  1: string;
}
