<template>
  <header :class="{ shrinkHeader: shrinkHeader }" class="header">
    <p class="category-title">{{ path }}</p>
    <p class="icons">
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
  shrinkHeader = false;
  lastScrollPosition = 0;

  created() {
    const local = localStorage.getItem("cartItems");
    if (local === null) return;
    const cartItems = JSON.parse(local);
    shopCart.getItemsFromLocalStorage(cartItems);
  }
  onScroll() {
    if (window.innerWidth > 1000) {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (currentScrollPosition > 60) {
        this.shrinkHeader = true;
      } else this.shrinkHeader = false;
      this.lastScrollPosition = currentScrollPosition;
    } else this.shrinkHeader = false;
  }

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
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
  position: fixed;
  display: flex;
  top: 0;
  max-width: 950px;
  background-color: white;
  z-index: 50;
  margin: 0 auto;
  left: 250px;
  right: 0;
  height: 84px;
  align-items: center;
  justify-content: space-between;
  font-family: $font-primary;
  transition: 0.2s;

  &.shrinkHeader {
    height: 48px;
    & .category-title {
      font-size: 1.2rem;
    }
  }
  .icons {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  @media screen and (max-width: 1000px) {
    position: static;
  }

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
    transition: 0.2s;
  }
}
</style>
