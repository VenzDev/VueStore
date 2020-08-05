<template>
  <div>
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
export default class Jeans extends Vue {}
</script>

<style lang="scss" scoped>
.itemsAmount {
  display: block;
  color: grey;

  font-family: "Roboto", sans-serif;
  margin: 1rem;
}

.itemsContainer {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  & div {
    flex-basis: 25%;
    margin-bottom: 20px;

    @media screen and (max-width: 780px) {
      flex-basis: 33%;
    }

    @media screen and (max-width: 540px) {
      flex-basis: 50%;
    }

    @media screen and (max-width: 400px) {
      flex-basis: 100%;
    }

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
