import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
    type: "asc",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSortType(state, action) {
      state.sort.type = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
