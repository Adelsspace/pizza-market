export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  type?: "asc" | "desc";
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
