<template>
  <header class="header">
    <p class="category-title u-Montserrat">{{ path }}</p>
    <p>
      <router-link to="/shop-cart">
        <i class="fa fa-shopping-cart"></i>
      </router-link>
      <i class="fa fa-search"></i>
    </p>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  get path() {
    return this.$route.name;
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";

.header {
  display: flex;
  width: 100%;
  height: 84px;
  align-items: center;
  justify-content: space-between;

  & i {
    font-size: 24px;
    transition: 0.2s;
    margin-right: 1rem;

    &:hover {
      transform: scale(1.1) rotate(-15deg);
    }
  }
  .category-title {
    margin-left: 1rem;
    font-size: 24px;
    line-height: 1.5;
  }
}
</style>
