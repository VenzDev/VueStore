<template>
  <div>
    <div class="newCollectionContainer">
      <h1>New arrivals</h1>
      <h2>COLLECTION 2020</h2>
    </div>
    <img class="image" :src="newCollectionUrl" alt="newCollection" />
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
@import "@/styles/config.scss";

.newCollectionContainer {
  position: absolute;
  top: 130px;
  left: 50px;
  color: white;
  font-family: $font-primary;

  & h1 {
    font-size: 4rem;
  }
  & h2 {
    font-size: 2rem;
  }

  @media screen and (max-width: 540px) {
    top: 100px;
    left: 30px;

    & h1 {
      font-size: 3rem;
    }
    & h2 {
      font-size: 1.5rem;
    }
  }
}
.image {
  width: 100%;
}
</style>
