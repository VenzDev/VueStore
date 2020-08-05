import axios from "axios";
import ItemModel from "./models/ItemModel";

const url = "http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6";

export const getItems = async () => {
  const fetchedData = await axios.get(url);
  return fetchedData.data;
};

export const getItem = async (id: number) => {
  const fetchedData = await axios.get(url);
  return fetchedData.data.filter((item: ItemModel) => item.id === id)[0];
};
