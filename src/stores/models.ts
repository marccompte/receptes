export interface Ingredient {
  key: number;
  name: string;
  description: string;
  done: boolean;
}

export interface Step {
  key: number;
  name: string;
  done: boolean;
}

export interface Recipe {
  key: number;
  tit: string;
  cat: string;
  ing: [Ingredient];
  sub?: string;
  stp: [Step];
  isFiltered: boolean;
}

export interface Category {
  key: number;
  name: string;
  icon: string;
  isSelected: boolean;
  subs: [string];
}

// export interface FlatRecipe {
//   key: number;
//   tit: string;
//   cat: string;
//   ing: [[string]];
//   sub?: string;
//   isFiltered: boolean;
// }
