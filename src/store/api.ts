import axios from "axios";
import ItemModel from "./models/ItemModel";

const url = "http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6";

function shuffleArray(data: Array<ItemModel>, subcategory: boolean) {
  let j, x, i;
  let size = 0;
  if (subcategory) size = Math.floor(Math.random() * 5 + 5);
  else size = Math.floor(Math.random() * 10 + 10);
  for (i = data.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = data[i];
    data[i] = data[j];
    data[j] = x;
  }
  return data.slice(0, size);
}

export const getItems = async () => {
  const fetchedData = await axios.get(url);
  return fetchedData.data;
};

export const getItem = async (id: number) => {
  const fetchedData = await axios.get(url);
  return fetchedData.data.filter((item: ItemModel) => item.id === id)[0];
};

export const getCategoryItems = async (subcategory: boolean) => {
  const fetchedData = await axios.get(url);
  if (subcategory) return shuffleArray(fetchedData.data, true);
  else return shuffleArray(fetchedData.data, false);
};
