import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  type: [];
  price: number;
  size: [];
  count: number;
  imageUrl: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status.LOADING | Status.ERROR | Status.SUCCESS;
}

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

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});
export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
