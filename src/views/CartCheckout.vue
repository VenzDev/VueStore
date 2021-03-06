<template>
  <div class="checkoutContainer">
    <SubmitPaymentModal v-if="isSubmitModalOpen" :deliveryMethod="deliveryMethod" :handleModal="handleModal" />
    <div class="userInfoContainer">
      <DeliveryMethod />
      <Payments v-if="userData && deliveryMethod && !isCollectOnDelivery" />
      <section v-if="userData && deliveryMethod && (paymentMethod || isCollectOnDelivery)">
        <button @click="handleModal">
          {{ isCollectOnDelivery ? "Order" : "Order and Pay" }}
        </button>
      </section>
    </div>
    <div class="submitContainer">
      <div class="submit">
        <div>
          <h2>Order Price:</h2>
          <h2>{{ `$${itemsPrice}` }}</h2>
        </div>
        <div v-if="deliveryMethod">
          <h2>Delivery:</h2>
          <h2>{{ deliveryMethod.price }}</h2>
          <div class="line"></div>
        </div>
        <div v-if="deliveryMethod">
          <h2>Total:</h2>
          <h2>{{ `$${totalPrice}` }}</h2>
        </div>
        <div v-if="deliveryMethod" class="deliverySubmit">
          <h2>Delivery Method:</h2>
          <h2>{{ deliveryMethod.name }}</h2>
        </div>
        <div v-if="paymentMethod" class="paymentSubmit">
          <h2>Payment Method:</h2>
          <p>Secure Payment <i class="fa fa-lock"></i></p>
          <h2>{{ paymentMethod.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import shopCart from "@/store/modules/shopCart";
import DeliveryMethod from "@/components/Checkout/DeliveryMethod";
import UserCourierModel from "@/store/models/UserCourierModel";
import UserInStoreModel from "@/store/models/UserInStoreModel";
import Payments from "@/components/Checkout/Payments.vue";
import SubmitPaymentModal from "@/components/Checkout/SubmitPaymentModal.vue";
import { COLLECT_ON_DELIVERY } from "@/utils/deliveryMethods";

@Component({
  components: { DeliveryMethod, Payments, SubmitPaymentModal }
})
export default class CartCheckout extends Vue {
  userAddessData: UserCourierModel | UserInStoreModel | null = null;
  isSubmitModalOpen = false;
  //delivery method name
  COLLECT_ON_DELIVERY: string = COLLECT_ON_DELIVERY;

  handleModal() {
    this.isSubmitModalOpen = !this.isSubmitModalOpen;
  }

  mounted() {
    if (shopCart.emptyCart) this.$router.push("/");
    shopCart.setPaymentMethod(null);
    shopCart.setDeliveryMethod(null);
  }

  get itemsPrice() {
    return shopCart.itemsPrice;
  }
  get totalPrice() {
    if (this.deliveryMethod) return (parseFloat(this.deliveryMethod.price.substr(1)) + this.itemsPrice).toFixed(2);
    return null;
  }
  get userData() {
    return shopCart.userData;
  }
  //Check if is collect on delivery method selected (payment method is not necessary)
  get isCollectOnDelivery() {
    if (shopCart.deliveryMethod && shopCart.deliveryMethod.name === this.COLLECT_ON_DELIVERY) return true;
    return false;
  }
  get deliveryMethod() {
    return shopCart.deliveryMethod;
  }
  get paymentMethod() {
    return shopCart.paymentMethod;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.checkoutContainer {
  display: flex;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  & .userInfoContainer {
    flex-basis: 70%;

    button {
      padding: 0.8rem 1.2rem;
      width: 250px;
      font-size: 1.4rem;
      color: white;
      background-color: black;
      border: none;
      display: block;
      margin: 2rem auto;
      cursor: pointer;
    }
  }
  & .submitContainer {
    flex-basis: 30%;
    background-color: lightgray;
    padding: 1rem;
    padding-top: 2.5rem;

    & .submit {
      top: 60px;
      font-family: $font-secondary;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      position: sticky;
      color: black;
      -webkit-position: sticky;

      & .deliverySubmit {
        margin-top: 1.5rem;
      }

      & > div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        &.paymentSubmit {
          margin-top: 2rem;
          flex-direction: column;

          p {
            margin-top: 1rem;
            color: green;
          }
        }

        & .line {
          flex-basis: 100%;
          height: 2px;
          background-color: black;
          margin-bottom: 1rem;
        }
      }

      & p {
        margin-top: 3rem;
      }
    }
  }
}
</style>
