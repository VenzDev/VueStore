<template>
  <section class="subscribeContainer">
    <h1>Subscribe</h1>
    <p>To get special offers and VIP treatment:</p>
    <input type="text" placeholder="Enter e-mail" />
    <button>Subscribe</button>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Subscribe extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";

.subscribeContainer {
  padding: 2rem 1rem;
  background-color: black;
  font-family: $font-primary;
  color: white;

  & input {
    display: block;
    width: 100%;
    height: 40px;
    font-size: 1rem;
  }
  & h1 {
    font-weight: normal;
    font-size: 2rem;
    padding: 1rem 0;
  }
  & p {
    padding: 0.5rem 0;
  }
  & button {
    background-color: #f44336;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    margin: 1rem 0;
    cursor: pointer;

    &:hover {
      color: black;
      background-color: grey;
    }
  }
}
</style>
