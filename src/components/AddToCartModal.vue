<template>
  <transition name="fade">
    <Modal v-if="isModalOpen">
      <div class="modalContainer">
        <h2>{{ item.product_name }}</h2>
        <p>{{ item.price + " per Item" }}</p>
        <div class="item_quantity">
          <button
            :class="{ disable: lowQuantity }"
            :disabled="lowQuantity"
            @click="quantity--"
          >
            -
          </button>
          <p>{{ quantity }}</p>
          <button @click="quantity++">+</button>
        </div>
        <div class="buttons">
          <button @click="handleModal">Close</button>
          <button @click="handleAddItemToCart">
            Add To Cart <i class="fa fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </Modal>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import shopCart from "@/store/modules/shopCart";
import ItemModel from "@/store/models/ItemModel";

@Component({ components: { Modal } })
export default class AddToCartModal extends Vue {
  @Prop() handleModal!: Function;
  @Prop() item!: ItemModel;
  @Prop() isModalOpen!: boolean;
  quantity = 1;

  get lowQuantity() {
    return this.quantity <= 1 ? true : false;
  }

  handleAddItemToCart() {
    if (this.quantity > 0)
      shopCart.addItem({ item: this.item, quantity: this.quantity });
    this.handleModal();
  }

  @Watch("isModalOpen")
  clearQuantity() {
    this.quantity = 1;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.modalContainer {
  min-width: 350px;
  font-family: $font-primary;
  & h2,
  & p {
    margin-bottom: 1rem;
  }

  & .item_quantity {
    margin-bottom: 1rem;
    display: flex;

    & p,
    button {
      height: 30px;
      width: 30px;
      font-size: 1.5rem;
      font-family: $font-secondary;
    }

    & p {
      text-align: center;
      border: 2px solid black;
      margin: 0 5px;
    }

    & button {
      &.disable {
        background-color: gray;
      }
      border: none;
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }

  & input {
    display: block;
    font-size: 1rem;
    margin-bottom: 1rem;
    border: 1px solid black;
    padding: 0.5rem;
  }
  & .buttons {
    display: flex;

    & button {
      flex: 50%;
      border: none;
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    & button:nth-child(1) {
      color: white;
      background-color: black;
    }
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
