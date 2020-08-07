<template>
  <div class="cartContainer" v-if="!isCartEmpty">
    <div class="itemsContainer">
      <div class="item" v-for="item in cartItems" :key="item.id">
        <img :src="item.item.image" alt="itemImage" />
        <div>
          <h2>{{ item.item.product_name }}</h2>
          <h2>{{ item.item.price }}</h2>
          <div class="item_quantity">
            <button @click="decrementItemQuantity(item.item.id)">-</button>
            <p>{{ item.quantity }}</p>
            <button @click="incrementItemQuantity(item.item.id)">+</button>
          </div>
        </div>
        <p class="thrashIcon">
          <i @click="removeItem(item.item.id)" class="fa fa-trash"></i>
        </p>
      </div>
    </div>
    <div class="checkoutContainer">
      <div class="checkout">
        <div class="checkout_info">
          <h2>Products Price</h2>
          <h2>{{ "$" + itemsPrice }}</h2>
        </div>
        <div class="checkout_info">
          <h2>Delivery</h2>
          <h2>{{ "$" + deliveryPrice }}</h2>
        </div>
        <div class="line"></div>
        <div class="checkout_info">
          <h2>Total</h2>
          <h2>{{ "$" + totalPrice }}</h2>
        </div>
        <button>Go to Checkout</button>
      </div>
    </div>
  </div>
  <div class="emptyCart" v-else>
    <h2>Your Cart is Empty</h2>
    <img src="@/assets/empty-cart.png" alt="emptyCart" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import shopCart from "@/store/modules/shopCart";

@Component
export default class ShopCart extends Vue {
  deliveryPrice = 8.99;
  get isCartEmpty() {
    return shopCart.emptyCart;
  }

  get cartItems() {
    return shopCart.cartItems;
  }

  get cartCount() {
    return shopCart.cartCount;
  }

  get itemsPrice() {
    return shopCart.itemsPrice;
  }
  get totalPrice() {
    return (this.deliveryPrice + this.itemsPrice).toFixed(2);
  }

  incrementItemQuantity(id: number) {
    shopCart.incrementItemQuantity(id);
  }

  decrementItemQuantity(id: number) {
    shopCart.decrementItemQuantity(id);
  }

  removeItem(id: number) {
    shopCart.removeItem(id);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.cartContainer {
  display: flex;

  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
  & .itemsContainer {
    flex-basis: 60%;

    & .item {
      display: flex;
      margin: 1rem;

      & .thrashIcon {
        flex-grow: 1;
        font-size: 1.5rem;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        & i {
          transition: 0.2s;
          cursor: pointer;

          &:hover {
            font-size: 1.7rem;
          }
        }
      }

      & .item_quantity {
        margin: 1rem;
        display: flex;

        & p,
        button {
          height: 30px;
          width: 30px;
          font-size: 1.5rem;
          font-family: $font-secondary;
        }

        & p {
          text-align: center;
          border: 2px solid black;
          margin: 0 5px;
        }

        & button {
          border: none;
          background-color: black;
          color: white;
          cursor: pointer;
        }
      }

      & img {
        width: 30%;
      }

      & h2 {
        font-size: 1.2rem;
        font-family: $font-secondary;
        padding: 1rem;
      }
    }
  }
  & .checkoutContainer {
    flex-basis: 40%;
    background-color: lightgray;
    padding: 1rem;

    @media screen and (max-width: 740px) {
      order: -1;
    }
  }
  & .checkout {
    top: 20px;
    font-family: $font-secondary;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    position: sticky;
    color: black;
    -webkit-position: sticky;

    & .line {
      margin-top: 1rem;
      height: 2px;
      background-color: black;
    }

    & .checkout_info {
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
    }

    & button {
      margin-top: 1rem;
      color: white;
      background-color: black;
      font-family: inherit;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
    }
  }
}
.emptyCart {
  font-family: $font-secondary;
  display: flex;
  align-items: center;
  justify-content: center;
  & h2 {
    padding: 2rem;
  }
  & img {
    width: 40%;
    padding: 2rem;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    & img {
      width: 60%;
    }
  }
}
</style>
