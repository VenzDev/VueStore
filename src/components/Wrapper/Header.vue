<template>
  <header class="header">
    <p class="category-title">{{ path }}</p>
    <p>
      <router-link to="/shop-cart">
        <i class="fa fa-shopping-cart">
          <div v-if="!emptyCart" class="cartQuantity">
            {{ cartCount }}
          </div>
        </i>
      </router-link>
      <i class="fa fa-search"></i>
    </p>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import shopCart from "@/store/modules/shopCart";

@Component
export default class Header extends Vue {
  created() {
    const local = localStorage.getItem("cartItems");
    if (local === null) return;
    const cartItems = JSON.parse(local);
    shopCart.getItemsFromLocalStorage(cartItems);
  }

  get path() {
    const { params, name } = this.$route;
    if (name === "Category") {
      if (params.subcategory) {
        return params.subcategory + " " + params.category;
      }
      return params.category;
    }
    return name;
  }
  get cartCount() {
    return shopCart.cartCount;
  }
  get emptyCart() {
    return shopCart.emptyCart;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.header {
  display: flex;
  width: 100%;
  height: 84px;
  align-items: center;
  justify-content: space-between;
  font-family: $font-primary;

  & .cartQuantity {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-family: $font-primary;
    position: absolute;
    top: 50%;
    right: -50%;
    z-index: 10;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    background-color: orange;
  }

  & i {
    font-size: 24px;
    transition: 0.2s;
    margin-right: 1rem;
    position: relative;

    &:hover {
      transform: scale(1.1) rotate(-15deg);
    }
  }
  .category-title {
    margin-left: 1rem;
    font-size: 24px;
    line-height: 1.5;
    text-transform: capitalize;
  }
}
</style>
