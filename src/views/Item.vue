<template>
  <div class="wrapper">
    <transition name="fade">
      <Modal :handleModal="handleModal" v-if="isModalOpen">
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
    <div class="spinnerContainer" v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div class="itemContainer" v-else>
      <div class="itemImage">
        <img :src="item.image" alt="itemImage" />
      </div>
      <div class="itemInfo">
        <h2>{{ item.product_name }}</h2>
        <h3>{{ item.price }}</h3>
        <p>{{ item.short_description }}</p>
        <p class="sizeHelp"><i class="fa fa-shirtsinbulk"></i> Size help</p>
        <button @click="isModalOpen = !isModalOpen">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getItem } from "@/store/api";
import ItemModel from "@/store/models/ItemModel";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Modal from "@/components/Modal.vue";
import shopCart from "@/store/modules/shopCart";

@Component({ components: { LoadingSpinner, Modal } })
export default class Item extends Vue {
  item: ItemModel | null = null;
  isLoading = false;
  isModalOpen = false;
  quantity = 1;

  get lowQuantity() {
    return this.quantity <= 1 ? true : false;
  }

  handleModal() {
    this.isModalOpen = false;
  }

  async created() {
    this.isLoading = true;
    this.item = await getItem(parseInt(this.$route.params.id));
    this.isLoading = false;
  }

  handleAddItemToCart() {
    if (this.item !== null && this.quantity > 0)
      shopCart.addItem({ item: this.item, quantity: this.quantity });
    this.handleModal();
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.wrapper {
  margin: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
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
.spinnerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.itemContainer {
  display: flex;
  flex-wrap: wrap;
  & .itemImage {
    flex-basis: 40%;

    @media screen and (max-width: 780px) {
      flex-basis: 100%;
    }

    & img {
      width: 100%;
    }
  }

  & .itemInfo {
    margin: 2rem;
    flex-basis: 50%;
    font-family: $font-primary;

    @media screen and (max-width: 780px) {
      flex-basis: 100%;
    }

    & h2 {
      margin-bottom: 1rem;
    }
    & h3 {
      margin-bottom: 1rem;
    }

    & button {
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      font-family: $font-secondary;
      background-color: black;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 6px;
      transition: 0.2s;

      &:hover {
        background-color: gray;
        color: black;
      }
      &:active {
        transform: scale(1.08);
      }
    }

    & .sizeHelp {
      margin: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: blue;
      }
    }
  }
}
</style>
