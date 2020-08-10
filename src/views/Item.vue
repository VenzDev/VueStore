<template>
  <div class="wrapper">
    <AddToCartModal
      :item="item"
      :handleModal="handleModal"
      :isModalOpen="isModalOpen"
    />
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
import AddToCartModal from "@/components/AddToCartModal.vue";

@Component({ components: { LoadingSpinner, AddToCartModal } })
export default class Item extends Vue {
  item: ItemModel | null = null;
  isLoading = false;
  isModalOpen = false;

  handleModal() {
    this.isModalOpen = false;
  }

  async created() {
    this.isLoading = true;
    this.item = await getItem(parseInt(this.$route.params.id));
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
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
