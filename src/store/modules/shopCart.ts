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

  get itemsPrice(): number {
    let totalPrice = 0;
    this.cart.forEach(item => {
      const price = item.item.price.substr(1);
      totalPrice += item.quantity * parseFloat(price);
    });
    return parseFloat(totalPrice.toFixed(2));
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

  @Action({ commit: "updateCart" })
  decrementItemQuantity(id: number) {
    const cart = this.cart;
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id);

    if (index === -1) return cart;
    else {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
      return cart;
    }
  }

  @Action({ commit: "updateCart" })
  incrementItemQuantity(id: number) {
    const cart = this.cart;
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id);

    if (index === -1) return cart;
    else {
      cart[index].quantity++;
      return cart;
    }
  }

  @Action({ commit: "updateCart" })
  removeItem(id: number) {
    const cart = this.cart;
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id);

    if (index === -1) return cart;
    else {
      cart.splice(index, 1);
      return cart;
    }
  }
}

export default getModule(ShopCartModule);
