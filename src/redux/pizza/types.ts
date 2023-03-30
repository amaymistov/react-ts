export type Pizza = {
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

export interface PizzaSliceState {
  items: Pizza[];
  status: Status.LOADING | Status.ERROR | Status.SUCCESS;
}
