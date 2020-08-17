<template>
  <transition name="fade">
    <Modal>
      <div v-if="!isSubmitted">
        <div
          class="bankTransfer"
          v-if="paymentMethod && paymentMethod.id === BANK_TRANSFER"
        >
          <h2>Bank Transfer (TODO)</h2>
          <div class="buttons">
            <button @click="cancelPayment">Cancel Payment</button>
            <button @click="handleSubmit">Finish</button>
          </div>
        </div>
        <div
          class="blik"
          v-else-if="paymentMethod && paymentMethod.id === BLIK"
        >
          <h2>Blik</h2>
          <input v-model="blik" @keypress="onlyNumber" type="text" />
          <p class="error" v-if="error">{{ error }}</p>
          <div class="buttons">
            <button @click="cancelPayment">Cancel Payment</button>
            <button @click="handleBlikSubmit">Finish</button>
          </div>
        </div>
        <div
          class="creditCard"
          v-else-if="paymentMethod && paymentMethod.id === CREDIT_CARD"
        >
          <VCreditCard @change="creditInfoChanged" />
          <div>
            <p class="error" v-if="cardError.name">{{ cardError.name }}</p>
            <p class="error" v-if="cardError.cardNumber">
              {{ cardError.cardNumber }}
            </p>
            <p class="error" v-if="cardError.expirationNumber">
              {{ cardError.expirationNumber }}
            </p>
            <p class="error" v-if="cardError.securityCode">
              {{ cardError.securityCode }}
            </p>
            <div class="buttons">
              <button @click="cancelPayment">Cancel Payment</button>
              <button @click="handleCardSubmit">Finish</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="finish">
          <img src="@/assets/confirm.png" alt="finished" />
          <h2>Order successfully finished</h2>
          <button @click="handleCloseSuccess">Back to shop</button>
        </div>
      </div>
    </Modal>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import shopCart from "@/store/modules/shopCart";
import DeliveryModel from "@/store/models/DeliveryModel";
import {
  validateBlik,
  ErrorCard,
  validateCard
} from "@/utils/validators/validateCard";
import VCreditCard from "v-credit-card";
import "v-credit-card/dist/VCreditCard.css";
import { CREDIT_CARD, BANK_TRANSFER, BLIK } from "@/utils/payments";
import { COLLECT_ON_DELIVERY } from "@/utils/deliveryMethods";

@Component({ components: { Modal, VCreditCard } })
export default class SubmitPaymentModal extends Vue {
  @Prop() handleModal!: Function;
  @Prop() deliveryMethod!: DeliveryModel;
  //payment methods names
  CREDIT_CARD: number = CREDIT_CARD;
  BANK_TRANSFER: number = BANK_TRANSFER;
  BLIK: number = BLIK;

  isSubmitted = false;
  blik = "";
  error: string | null = null;
  cardError: ErrorCard = {
    name: null,
    expirationNumber: null,
    cardNumber: null,
    securityCode: null
  };

  //card variables
  name = "";
  cardNumber = "";
  expiration = "";
  security = "";

  get paymentMethod() {
    return shopCart.paymentMethod;
  }

  //Check if input for blik contains only number and exactly 6 digits
  onlyNumber($event) {
    const keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      $event.preventDefault();
    }
    if (this.blik.length === 6) $event.preventDefault();
  }

  creditInfoChanged(values) {
    for (const key in values) {
      this[key] = values[key];
    }
  }

  handleCloseSuccess() {
    this.handleModal();
    shopCart.clearShopCart();
    this.$router.push("/");
  }

  handleSubmit() {
    this.isSubmitted = true;
  }
  handleBlikSubmit() {
    this.error = null;
    if (this.blik.trim().length === 0) this.error = "Blik cannot be empty";
    if (!validateBlik(this.blik))
      this.error = "Blik must contain exactly 6 digits";
    if (!this.error) {
      this.isSubmitted = true;
    }
  }
  handleCardSubmit() {
    const { isValid, error } = validateCard({
      name: this.name,
      expirationNumber: this.expiration,
      securityCode: this.security,
      cardNumber: this.cardNumber
    });
    if (isValid) this.isSubmitted = true;
    else this.cardError = error;
  }
  cancelPayment() {
    shopCart.setPaymentMethod(null);
    shopCart.setDeliveryMethod(null);
    this.$router.push("/shop-cart");
  }

  mounted() {
    document.documentElement.style.overflow = "hidden";
    //check if deliveryMethod is a collect on delivery
    //Collect on delivery don't need payment method so it's treated as sucessfully ordered
    if (this.deliveryMethod.name === COLLECT_ON_DELIVERY) {
      this.isSubmitted = true;
    }
  }
  beforeDestroy() {
    document.documentElement.style.overflow = "auto";
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.buttons {
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
  & button:first-child {
    background-color: lightgray;
    color: black;
  }
}
.blik {
  font-family: $font-primary;

  & .error {
    text-align: center;
    margin-top: 0.5rem;
    color: red;
    font-size: 1rem;
  }

  & h2 {
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  & input {
    display: block;
    margin: 0 auto;
    width: 60%;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }
}
.creditCard {
  width: 600px;

  font-family: $font-primary;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: center;
    width: 550px;
    height: 100vh;
    overflow-y: scroll;
  }

  @media screen and (max-width: 550px) {
    width: 400px;
  }

  & .error {
    color: red;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
}
.bankTransfer {
  font-family: $font-primary;
}

.finish {
  font-family: $font-primary;
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 50%;
  }
  & h2 {
    margin-top: 2rem;
  }
  & button {
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

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
