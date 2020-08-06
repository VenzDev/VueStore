<template>
  <div class="wrapper">
    <div class="spinnerContainer" v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div class="itemContainer" v-else>
      <div class="itemImage">
        <img :src="item.image" alt="itemImage" />
      </div>
      <div class="itemInfo u-Montserrat">
        <h2>{{ item.product_name }}</h2>
        <h3>{{ item.price }}</h3>
        <p>{{ item.short_description }}</p>
        <p class="sizeHelp"><i class="fa fa-shirtsinbulk"></i> Size help</p>
        <button @click="handleAddItemToCart" class="u-Roboto">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getItem } from "@/store/api";
import ItemModel from "@/store/models/ItemModel";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Modal from "@/components/Modal.vue";
import shopCart from "@/store/modules/shopCart";

@Component({ components: { LoadingSpinner, Modal } })
export default class Item extends Vue {
  item: ItemModel | null = null;
  isLoading = false;
  async created() {
    this.isLoading = true;
    this.item = await getItem(parseInt(this.$route.params.id));
    this.isLoading = false;
  }

  handleAddItemToCart() {
    if (this.item !== null) shopCart.addItem({ item: this.item, quantity: 1 });
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";
.wrapper {
  margin: 1rem;
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
