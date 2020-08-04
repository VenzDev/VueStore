<template>
  <div>
    <img class="image" :src="newCollectionUrl" alt="newCollection" />
    <p class="itemsAmount">8 Items</p>
    <section class="itemsContainer">
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
      <div>
        <img
          src="https://www.w3schools.com//w3images/jeans1.jpg"
          alt="itemImage"
        />
        <p class="itemName">Ripped Skinny Jeans</p>
        <p class="itemPrice">$24.99</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  newCollectionUrl = "https://www.w3schools.com/w3images/jeans.jpg";
}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";
.image {
  width: 100%;
}
.itemsAmount {
  display: block;
  color: grey;
  margin: 1rem 0;
}

.itemsContainer {
  display: flex;
  flex-wrap: wrap;

  & div {
    flex-basis: 25%;
    margin-bottom: 20px;

    & img {
      width: 100%;
      filter: grayscale(80%);
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        filter: grayscale(0%);
      }
    }

    & .itemName,
    .itemPrice {
      font-family: "Roboto", sans-serif;
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
