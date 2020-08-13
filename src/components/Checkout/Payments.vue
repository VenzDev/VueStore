<template>
  <section class="payments">
    <h2><span class="circle">2</span> Choose Payment Method</h2>
    <ul>
      <li
        v-for="payment in payments"
        :key="payment.id"
        @click="handleSelect(payment)"
      >
        <i
          :class="{
            active: selectedPayment && selectedPayment.id === payment.id
          }"
          class="iconCircle fa fa-circle"
        ></i>
        {{ payment.name }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import shopCart from "@/store/modules/shopCart";
import PaymentMethod from "@/store/models/PaymentMethod";
import { payments } from "@/utils/payments";

@Component
export default class Payments extends Vue {
  payments: Array<PaymentMethod> = payments;
  selectedPayment: PaymentMethod | null = null;

  handleSelect(payment: PaymentMethod) {
    this.selectedPayment = payment;
    shopCart.setPaymentMethod(payment);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.payments {
  font-family: $font-primary;
  & h2 {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
  & h2 > .circle {
    display: inline-block;
    border: 2px solid black;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    margin-bottom: 3rem;
    margin-right: 2rem;
    & li {
      display: flex;
      align-items: center;
      padding: 2rem;
      border: 1px solid black;
      cursor: pointer;

      &:hover .iconCircle {
        color: grey;
      }

      & .paymentImage {
        width: 100px;
      }

      & .iconCircle {
        font-size: 2rem;
        color: lightgray;
        margin-right: 20px;

        &.active {
          color: black;
        }
      }
    }
  }
}
</style>
