import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { urlItems, category, sortType, order, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `${urlItems}${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
  }
);
