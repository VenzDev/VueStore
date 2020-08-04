<template>
  <header class="header">HEADER</header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 84px;
  border: 1px solid black;
}
</style>
