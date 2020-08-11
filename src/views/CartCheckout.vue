<template>
  <div class="checkoutContainer">
    <DeliveryMethod />
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
import DeliveryMethod from "@/components/DeliveryMethod.vue";

@Component({ components: { DeliveryMethod } })
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
