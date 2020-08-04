<template>
  <div class="container">
    <SideNavbar />
    <router-view class="content" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SideNavbar from "@/components/SideNavbar.vue";

@Component({ components: { SideNavbar } })
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

.container {
  display: flex;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  & .content {
    flex-basis: 100%;
  }
}
</style>
