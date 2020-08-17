<template>
  <div>
    <AddToCartModal
      :item="selectedItem"
      :handleModal="handleModal"
      :isModalOpen="isModalOpen"
    />
    <div class="spinnerContainer" v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <p class="itemsAmount">{{ "Items: " + itemsAmount }}</p>
      <div class="priceRangeContainer">
        <p>Price range</p>
        <VueSlider :max="max" :min="min" v-model="value"></VueSlider>
      </div>
      <section class="itemsContainer">
        <div v-for="item in filteredItems" :key="item.id">
          <button @click="handleSelectItem(item)" class="addToCartButton">
            Add to Cart<i class="fa fa-shopping-cart"></i>
          </button>
          <router-link tag="div" :to="'/item/' + item.id">
            <div class="imageContainer">
              <img :src="item.image" alt="itemImage" />
            </div>
            <p class="itemName">{{ item.product_name }}</p>
            <p class="itemPrice">{{ item.price }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { getCategoryItems } from "@/store/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ItemModel from "@/store/models/ItemModel";
import validateCategoryUrl from "@/utils/validators/validateCategoryUrl";
import "vue-slider-component/theme/antd.css";
import VueSlider from "vue-slider-component";
import AddToCartModal from "@/components/AddToCartModal.vue";

@Component({ components: { LoadingSpinner, VueSlider, AddToCartModal } })
export default class Category extends Vue {
  isLoading = false;
  items: Array<ItemModel> | null = null;
  selectedItem: ItemModel | null = null;
  value = [0, 100];
  itemsAmount = 0;
  max = 250;
  min = 0;
  isModalOpen = false;
  validateUrl() {
    const isValidUrl = validateCategoryUrl(this.$route.path);
    if (!isValidUrl) this.$router.push("/");
  }

  handleSelectItem(item: ItemModel) {
    this.selectedItem = item;
    this.handleModal();
  }
  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  async getItems() {
    this.validateUrl();
    this.isLoading = true;
    if (this.$route.params.subcategory)
      this.items = await getCategoryItems(true);
    else this.items = await getCategoryItems(false);
    this.isLoading = false;
    this.setPriceRange();
  }

  setPriceRange() {
    let min = 1000;
    let max = -1;
    this.items?.forEach(item => {
      const price = parseFloat(item.price.substr(1));
      if (price >= max) max = price;
      if (price <= min) min = price;
    });
    this.value[0] = Math.floor(min);
    this.min = Math.floor(min);
    this.max = Math.round(max);
    this.value[1] = Math.round(max);
  }

  async created() {
    await this.getItems();
  }
  @Watch("$route")
  async watchUrlChange() {
    await this.getItems();
  }
  get filteredItems() {
    const filteredItems = this.items?.filter(item => {
      const price = parseFloat(item.price.substr(1));
      if (price >= this.value[0] && price <= this.value[1]) return true;
      return false;
    });
    if (filteredItems) this.itemsAmount = filteredItems.length;
    else return 0;
    return filteredItems;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.itemsAmount {
  display: block;
  color: grey;

  font-family: $font-secondary;
  margin: 1rem;
}

.priceRangeContainer {
  font-family: $font-secondary;
  padding: 2rem;

  & p {
    margin-bottom: 1rem;
  }
}

.spinnerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.itemsContainer {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;

  & > div:hover .addToCartButton {
    display: block;
  }

  & .addToCartButton {
    display: none;
    position: absolute;
    z-index: 10;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-family: $font-secondary;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.2s;

    & i {
      margin-left: 5px;
    }

    &:hover {
      background-color: gray;
      color: black;
    }
    &:active {
      transform: scale(1.08);
    }
  }

  & > div {
    flex-basis: 25%;
    padding: 5px;
    margin-bottom: 20px;

    @media screen and (max-width: 780px) {
      flex-basis: 33.33%;
    }

    @media screen and (max-width: 580px) {
      flex-basis: 50%;
    }

    @media screen and (max-width: 460px) {
      flex-basis: 100%;
    }

    &:hover {
      .imageContainer img {
        transform: scaleX(1.1);
      }
      & p {
        font-weight: bold;
      }
    }

    & .imageContainer {
      overflow: hidden;
      & img {
        height: auto;
        width: 100%;
        transition: 0.2s;
        cursor: pointer;
      }
    }

    & .itemName,
    .itemPrice {
      font-family: $font-secondary;
    }
    & .itemName {
      margin-top: 1rem;
    }
    & .itemPrice {
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
}
</style>
