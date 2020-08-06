import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import CartItemModel from "../models/CartItemModel";

@Module({
  name: "shopCart",
  dynamic: true,
  store,
  namespaced: true
})
class ShopCartModule extends VuexModule {
  cart: Array<CartItemModel> = [];

  get cartCount() {
    let count = 0;
    this.cart.forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  get cartItems() {
    return this.cart;
  }

  get emptyCart() {
    return this.cart.length === 0 ? true : false;
  }

  @Mutation
  updateCart(cart: Array<CartItemModel>) {
    this.cart = cart;
  }

  @Action({ commit: "updateCart" })
  addItem(item: CartItemModel) {
    const cart = this.cart;
    const index = this.cart.findIndex(
      cartItem => cartItem.item.id === item.item.id
    );

    if (index === -1) {
      cart.push(item);
      return cart;
    } else {
      cart[index].quantity += item.quantity;
      return cart;
    }
  }
}

export default getModule(ShopCartModule);
