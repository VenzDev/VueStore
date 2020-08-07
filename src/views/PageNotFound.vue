<template>
  <div class="notFoundContainer">
    <h1>404</h1>
    <h2>Page not found</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.notFoundContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-family: $font-secondary;

  & h1 {
    font-size: 4rem;
  }
  & h2 {
    font-size: 3rem;
  }
  @media screen and (max-width: 400px) {
    & h1 {
      font-size: 3rem;
    }
    & h2 {
      font-size: 2rem;
    }
  }
}
</style>
