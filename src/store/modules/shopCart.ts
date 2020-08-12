import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import CartItemModel from "../models/CartItemModel";
import UserCheckoutModel from "../models/UserCheckoutModel";
import DeliveryModel from "../models/DeliveryModel";
import UserInStoreModel from "../models/UserInStoreModel";
import UserCourierModel from "../models/UserCourierModel";
import PaymentMethod from "../models/PaymentMethod";

@Module({
  name: "shopCart",
  dynamic: true,
  store,
  namespaced: true
})
class ShopCartModule extends VuexModule {
  cart: Array<CartItemModel> = [];
  submitCheckoutData: UserCheckoutModel = {
    deliveryMethod: null,
    userAddressData: null,
    paymentMethod: null
  };

  get cartCount(): number {
    let count = 0;
    this.cart.forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  get userData() {
    return this.submitCheckoutData.userAddressData;
  }

  get deliveryMethod() {
    return this.submitCheckoutData.deliveryMethod;
  }

  get paymentMethod() {
    return this.submitCheckoutData.paymentMethod;
  }

  get cartItems(): Array<CartItemModel> {
    return this.cart;
  }

  get emptyCart(): boolean {
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
  updatePaymentMethod(paymentMethod: PaymentMethod) {
    this.submitCheckoutData.paymentMethod = paymentMethod;
  }

  @Mutation
  updateUserData(userData) {
    this.submitCheckoutData.userAddressData = userData;
  }

  @Mutation
  updateDeliveryMethod(deliveryMethod: DeliveryModel) {
    this.submitCheckoutData.deliveryMethod = deliveryMethod;
  }

  @Mutation
  updateCart(cart: Array<CartItemModel>) {
    if (cart.length === 0) {
      localStorage.removeItem("cartItems");
    } else localStorage.setItem("cartItems", JSON.stringify(cart));
    this.cart = cart;
  }

  @Action({ commit: "updatePaymentMethod" })
  setPaymentMethod(paymentMethod: PaymentMethod | null) {
    return paymentMethod;
  }

  @Action({ commit: "updateUserData" })
  setUserData(userData: UserInStoreModel | UserCourierModel | null) {
    return userData;
  }

  @Action({ commit: "updateDeliveryMethod" })
  setDeliveryMethod(deliveryMethod: DeliveryModel | null) {
    return deliveryMethod;
  }

  @Action({ commit: "updateCart" })
  addItem(item: CartItemModel) {
    const cart = this.cart;
    const index = this.cart.findIndex(
      cartItem => cartItem.item.id === item.item.id
    );

    if (index === -1) {
      cart.push(item);
    } else {
      cart[index].quantity += item.quantity;
    }
    return cart;
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
  @Action({ commit: "updateCart" })
  getItemsFromLocalStorage() {
    const local = localStorage.getItem("cartItems");
    if (local === null) return this.cart;
    return JSON.parse(local);
  }
  @Action({ commit: "updateCart" })
  clearShopCart() {
    return [];
  }
}

export default getModule(ShopCartModule);
