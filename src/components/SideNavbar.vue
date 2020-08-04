<template>
  <nav class="side-navbar">
    <h3 class="side-navbar-logo">
      <b>LOGO</b>
    </h3>
    <div class="navbar-list">
      <ul>
        <li>Shirts <i class="navIcon fa fa-caret-down"></i></li>
        <li>Dresses <i class="navIcon fa fa-caret-down"></i></li>
        <li>Jeans <i class="navIcon fa fa-caret-down"></i></li>
        <li>Jackets <i class="navIcon fa fa-caret-down"></i></li>
        <li>Gymwear <i class="navIcon fa fa-caret-down"></i></li>
        <li>Blazers <i class="navIcon fa fa-caret-down"></i></li>
        <li>Shoes <i class="navIcon fa fa-caret-down"></i></li>
      </ul>
    </div>
    <a href="#" class="linkItem u-navElement">Contact</a>
    <a href="#" class="linkItem u-navElement">Newsletter</a>
    <a href="#" class="linkItem u-navElement">Subscribe</a>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SideNavbar extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";
.side-navbar {
  flex-shrink: 0;
  width: 250px;
  font-family: "Roboto", sans-serif;

  & .navbar-list {
    padding: 64px 0;

    & li {
      position: relative;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      color: grey;
      cursor: pointer;

      &:hover {
        color: black;
        background-color: #ccc;
      }
      & .navIcon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
      }
    }
  }

  & .side-navbar-logo {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 24px;
    padding: 10px 0;
    margin: 1rem 0;

    & b {
      letter-spacing: 4px;
      line-height: 1.5;
    }
  }

  & .linkItem {
    display: block;
    color: black;
    font-size: 15px;
    cursor: pointer;

    &:active,
    &:focus,
    &:visited {
      color: black;
    }
  }
}
</style>
