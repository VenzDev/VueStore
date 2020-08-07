<template>
  <div>
    <div class="spinnerContainer" v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <p class="itemsAmount">{{ "Items: " + itemsAmount }}</p>
      <section class="itemsContainer">
        <router-link
          tag="div"
          :to="'/item/' + item.id"
          v-for="item in items"
          :key="item.id"
        >
          <div class="imageContainer">
            <img :src="item.image" alt="itemImage" />
          </div>
          <p class="itemName">{{ item.product_name }}</p>
          <p class="itemPrice">{{ item.price }}</p>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getItems } from "@/store/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ItemModel from "@/store/models/ItemModel";

@Component({ components: { LoadingSpinner } })
export default class Jeans extends Vue {
  isLoading = false;
  items: Array<ItemModel> | null = null;

  get itemsAmount() {
    if (!this.items) return "Not Found";
    return this.items.length;
  }

  async created() {
    this.isLoading = true;
    this.items = await getItems();
    this.isLoading = false;
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
