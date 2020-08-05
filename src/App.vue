<template>
  <div class="container">
    <SideNavbar
      :handleChange="this.handleChange"
      v-bind:class="{ active: isNavbar }"
    />
    <header class="headerNav">
      <div class="headerNav-logo">
        <b>LOGO</b>
      </div>
      <div @click="handleChange" class="headerNav-hamburger">
        <i class="fa fa-bars"></i>
      </div>
    </header>
    <Wrapper class="content">
      <div @click="handleChange" :class="{ xd: isNavbar }"></div>
      <router-view />
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SideNavbar from "@/components/SideNavbar.vue";
import Wrapper from "@/components/Wrapper";

@Component({ components: { SideNavbar, Wrapper } })
export default class App extends Vue {
  isNavbar = false;

  handleChange() {
    this.isNavbar = !this.isNavbar;
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;

  &:visited,
  &:active {
    color: inherit;
  }
}

.headerNav-logo {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 24px;
  padding: 10px 1rem;
  margin: 1rem 0;

  & b {
    letter-spacing: 4px;
    line-height: 1.5;
  }
}

.headerNav-hamburger {
  display: flex;
  align-items: center;
  color: white;
  font-size: 2rem;
  padding: 0 1rem;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: gray;
  }
}

.headerNav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  background-color: black;
  color: white;

  @media screen and (min-width: 1000px) {
    display: none;
  }
}
.xd {
  position: absolute;
  background-color: black;
  z-index: 50;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  @media screen and (min-width: 1000px) {
    display: none;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  & .content {
    position: relative;
    margin-left: 250px;
    flex-basis: 100%;

    @media screen and (max-width: 1000px) {
      margin-left: 0;
    }
  }

  & .headerNav {
    flex: 1 1 100%;
  }
}
</style>
