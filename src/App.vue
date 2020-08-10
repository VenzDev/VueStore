<template>
  <div class="container">
    <SideNavbar
      :handleChange="this.handleChange"
      v-bind:class="{ active: isNavbar }"
    />
    <header :class="{ shrinkHeader: shrinkHeader }" class="headerNav">
      <div class="headerNav-logo">
        <router-link to="/">
          <b>LOGO</b>
        </router-link>
      </div>
      <div class="iconsContainer">
        <router-link to="/shop-cart">
          <i class="fa fa-shopping-cart">
            <div v-if="!emptyCart" class="cartQuantity">
              {{ cartCount }}
            </div>
          </i>
        </router-link>
        <i class="fa fa-search"></i>
        <div @click="handleChange" class="headerNav-hamburger">
          <i class="fa fa-bars"></i>
        </div>
      </div>
    </header>
    <Wrapper class="content">
      <div @click="handleChange" :class="{ overlay: isNavbar }"></div>
      <router-view />
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SideNavbar from "@/components/SideNavbar.vue";
import Wrapper from "@/components/Wrapper";
import shopCart from "@/store/modules/shopCart";

@Component({ components: { SideNavbar, Wrapper } })
export default class App extends Vue {
  isNavbar = false;
  shrinkHeader = false;
  lastScrollPosition = 0;

  onScroll() {
    if (window.innerWidth < 1000) {
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

  handleChange() {
    this.isNavbar = !this.isNavbar;
  }
  get cartCount() {
    return shopCart.cartCount;
  }
  get emptyCart() {
    return shopCart.emptyCart;
  }
}
</script>

<style lang="scss">
@import "@/styles/app.global.scss";
@import "@/styles/config.scss";
.headerNav-logo {
  font-family: $font-primary;
  font-weight: 400;
  font-size: 24px;
  padding: 10px 1rem;
  margin: 1rem 0;
  transition: 0.2s;

  & b {
    letter-spacing: 4px;
    line-height: 1.5;
  }
}

.headerNav {
  position: fixed;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  background-color: black;
  color: white;
  transition: 0.2s;

  &.shrinkHeader {
    height: 60px;

    & .headerNav-logo {
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }
  }

  & .iconsContainer {
    display: flex;

    & > * {
      display: flex;
      align-items: center;
    }

    & i {
      font-size: 1.5rem;
      padding: 0 0.7rem;
      line-height: 1.5rem;
    }

    & .headerNav-hamburger {
      padding: 0.5rem;

      &:hover {
        color: black;
        background-color: gray;
      }

      & i {
        display: flex;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      }
    }

    & .cartQuantity {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-family: $font-primary;
      position: absolute;
      top: 50%;
      margin-left: 15px;
      z-index: 10;
      width: 20px;
      height: 20px;
      border-radius: 50%;

      background-color: orange;
    }
  }

  @media screen and (min-width: 1000px) {
    display: none;
  }
}
.overlay {
  position: absolute;
  background-color: black;
  z-index: 50;
  opacity: 0.5;
  top: -84px;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  @media screen and (min-width: 1000px) {
    display: none;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  & .content {
    position: relative;
    margin-left: 250px;
    margin-top: 84px;
    flex-basis: 100%;

    @media screen and (max-width: 1000px) {
      margin-left: 0;
    }
  }

  & .headerNav {
    flex: 1 1 100%;
  }
}
</style>
