import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, category, sortBy, orderType, search } = params;
    const res = await axios.get<Pizza[]>(
      `https://6383693c6e6c83b7a992dead.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${
        orderType ? orderType : "asc"
      }${search}`
    );
    return res.data;
  }
);
