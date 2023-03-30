export type CartItems = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  count: number;
  imageUrl: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}
