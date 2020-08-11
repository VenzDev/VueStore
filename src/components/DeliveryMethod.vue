<template>
  <div class="methodsContainer">
    <section class="deliveryMethods">
      <h2><span class="circle">1</span> Choose Delivery Method</h2>
      <ul>
        <li
          v-for="method in methods"
          :key="method.id"
          @click="handleSelect(method.name)"
        >
          <i
            :class="{ active: selectedMethod === method.name }"
            class="iconCircle fa fa-circle"
          ></i>
          {{ method.name }}
          <div class="fillSpace"></div>
          <p>{{ method.timeInfo }}</p>
          <p>{{ method.price }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import DeliveryModel from "@/store/models/DeliveryModel";

@Component
export default class DeliveryMethod extends Vue {
  @Prop() handleSelectDeliveryMethod!: Function;

  methods: Array<DeliveryModel> = [
    { id: 0, name: "In-store pickup", timeInfo: "1-2 days", price: "$0" },
    { id: 1, name: "Standard Courier", timeInfo: "2-3 days", price: "$6.99" },
    {
      id: 2,
      name: "Collect on Delivery",
      timeInfo: "1-2 days",
      price: "$12.99"
    }
  ];

  selectedMethod: DeliveryModel | null = null;

  handleSelect(name: DeliveryModel) {
    this.selectedMethod = name;
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
    & li {
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
  }
}
</style>
