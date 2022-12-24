export type SearchPizzaParams = {
  currentPage: string;
  category: string;
  sortBy: string;
  orderType: string;
  search: string;
};

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
