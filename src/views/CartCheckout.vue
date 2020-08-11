<template>
  <div class="checkoutContainer">
    <div class="methodsContainer">
      <p>1</p>
    </div>
    <div class="submitContainer">
      <div class="submit">
        <p>submit</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import shopCart from "@/store/modules/shopCart";

@Component
export default class CartCheckout extends Vue {
  created() {
    if (shopCart.emptyCart) this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.checkoutContainer {
  display: flex;

  & .methodsContainer {
    flex-basis: 70%;
  }
  & .submitContainer {
    flex-basis: 30%;
    background-color: lightgray;

    & .submit {
      top: 20px;
      font-family: $font-secondary;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      position: sticky;
      color: black;
      -webkit-position: sticky;

      & p {
        margin-top: 3rem;
      }
    }
  }
}
</style>
