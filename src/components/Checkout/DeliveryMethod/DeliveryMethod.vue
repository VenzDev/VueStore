<template>
  <div class="methodsContainer">
    <InStorePickupModal
      :handleSelect="handleSelect"
      :handleModal="handleInStoreModal"
      :isModalOpen="isInStoreModalOpen"
      :selectedMethod="selectedMethod"
    />
    <CourierModal
      :handleSelect="handleSelect"
      :handleModal="handleCourierModal"
      :isModalOpen="isCourierModalOpen"
      :selectedMethod="selectedMethod"
    />
    <section class="deliveryMethods">
      <h2><span class="circle">1</span> Choose Delivery Method</h2>
      <ul>
        <li
          v-for="method in methods"
          :key="method.id"
          @click="handleSelect(method)"
        >
          <div class="method">
            <i
              :class="{
                active: selectedMethod && selectedMethod.id === method.id
              }"
              class="iconCircle fa fa-circle"
            ></i>
            {{ method.name }}
            <div class="fillSpace"></div>
            <p>{{ method.timeInfo }}</p>
            <p>{{ method.price }}</p>
          </div>
          <div
            class="userInfo"
            v-if="address && selectedMethod && selectedMethod.id === method.id"
          >
            <div>
              <p>{{ `${address.name} ${address.surname}` }}</p>
              <p>{{ address.phone }}</p>
            </div>
            <div>
              <p v-if="selectedMethod.name !== IN_STORE_PICKUP">
                {{ `${address.street} ${address.homeNumber}` }}
              </p>
              <p v-if="selectedMethod.name !== IN_STORE_PICKUP">
                {{ `${address.zipCode} ${address.city}` }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DeliveryModel from "@/store/models/DeliveryModel";
import InStorePickupModal from "@/components/Checkout/DeliveryMethod/InStorePickupModal.vue";
import CourierModal from "@/components/Checkout/DeliveryMethod/CourierModal.vue";
import shopCart from "@/store/modules/shopCart";
import { methods, IN_STORE_PICKUP } from "@/utils/deliveryMethods";

@Component({ components: { InStorePickupModal, CourierModal } })
export default class DeliveryMethod extends Vue {
  isInStoreModalOpen = false;
  isCourierModalOpen = false;
  selectedMethod: DeliveryModel | null = null;
  methods: Array<DeliveryModel> = methods;
  IN_STORE_PICKUP = IN_STORE_PICKUP;

  get address() {
    return shopCart.userData;
  }

  handleInStoreModal() {
    this.isInStoreModalOpen = !this.isInStoreModalOpen;
  }
  handleCourierModal() {
    this.isCourierModalOpen = !this.isCourierModalOpen;
  }

  handleSelect(method: DeliveryModel | null) {
    if (method === null) {
      this.selectedMethod = null;
    } else {
      this.selectedMethod = method;
      if (method.id === 0) this.isInStoreModalOpen = true;
      else this.isCourierModalOpen = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.methodsContainer {
  flex-basis: 70%;

  .deliveryMethods {
    font-family: $font-primary;
    & h2 {
      display: flex;
      align-items: center;
      margin: 1rem 0;

      @media screen and (max-width: 700px) {
        margin: 1rem;
      }
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
  }
  ul {
    margin-bottom: 3rem;
    margin-right: 2rem;

    @media screen and (max-width: 700px) {
      margin-left: 2rem;
    }
    & li {
      & .method {
        display: flex;
        align-items: center;
        padding: 2rem;
        border: 1px solid black;
        cursor: pointer;

        &:hover .iconCircle {
          color: grey;
        }

        & .iconCircle {
          font-size: 2rem;
          color: lightgray;
          margin-right: 20px;

          &.active {
            color: black;
          }
        }

        & .fillSpace {
          flex-grow: 1;
        }

        & p:last-child {
          width: 80px;
          text-align: end;
        }
      }
      & .userInfo {
        padding: 1rem;
        display: flex;

        & p {
          margin-bottom: 0.5rem;
        }

        & div {
          flex-basis: 50%;
        }
      }
    }
  }
}
</style>
