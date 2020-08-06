import ItemModel from "./ItemModel";

export default interface CartItemModel {
  item: ItemModel;
  quantity: number;
}
