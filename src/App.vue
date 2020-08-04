<template>
  <div class="container">
    <SideNavbar />
    <Wrapper class="content">
      <router-view />
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SideNavbar from "@/components/SideNavbar.vue";
import Wrapper from "@/components/Wrapper";

@Component({ components: { SideNavbar, Wrapper } })
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
    margin-left: 250px;
    flex-basis: 100%;
  }
}
</style>
