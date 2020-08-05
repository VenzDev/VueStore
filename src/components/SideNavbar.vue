<template>
  <nav class="side-navbar">
    <h3 class="side-navbar-logo">
      <router-link to="/">
        <b>LOGO</b>
      </router-link>
    </h3>
    <div class="navbar-list">
      <ul>
        <li>
          <p>Shirts <i class="navIcon fa fa-caret-down"></i></p>
        </li>
        <li>
          <p>Dresses <i class="navIcon fa fa-caret-down"></i></p>
        </li>
        <li>
          <p @click="isJeansOpen = !isJeansOpen">
            Jeans <i class="navIcon fa fa-caret-down"></i>
          </p>
          <div class="subMenu" v-if="isJeansOpen">
            <router-link active-class="isActive" to="/jeans/skinny">
              <p @click="handleChange">
                <i class="subMenuIcon fa fa-caret-right"></i>
                Skinny
              </p>
            </router-link>
            <p>Relaxed</p>
            <p>Bootcut</p>
            <p>Straight</p>
          </div>
        </li>
        <li>
          <p>Jackets <i class="navIcon fa fa-caret-down"></i></p>
        </li>
        <li>
          <p>Gymwear <i class="navIcon fa fa-caret-down"></i></p>
        </li>
        <li>
          <p>Blazers <i class="navIcon fa fa-caret-down"></i></p>
        </li>
        <li>
          <p>Shoes <i class="navIcon fa fa-caret-down"></i></p>
        </li>
      </ul>
    </div>
    <a href="#" class="linkItem u-navElement">Contact</a>
    <a href="#" class="linkItem u-navElement">Newsletter</a>
    <a href="#" class="linkItem u-navElement">Subscribe</a>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SideNavbar extends Vue {
  @Prop() handleChange!: Function;
  isJeansOpen = false;
}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";
.side-navbar {
  flex-shrink: 0;
  width: 250px;
  font-family: "Roboto", sans-serif;
  position: fixed;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
  transition: 0.2s;

  &.active {
    display: block !important;
    background-color: white;

    min-height: 100vh;
    width: 250px;
  }

  @media screen and (max-width: 1000px) {
    width: 0;
  }

  & .navbar-list {
    padding: 64px 0;

    & li {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      color: grey;

      & p {
        cursor: pointer;
        padding: 8px 16px;
        position: relative;

        &:hover {
          color: black;
          background-color: #ccc;
        }
        & .navIcon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 50px;
        }
      }

      & .subMenu {
        & .subMenuIcon {
          display: none;
        }
        & p {
          margin-left: 15px;
          font-size: 1rem;
        }
      }
    }
  }

  & .side-navbar-logo {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 24px;
    padding: 10px 0;
    margin: 1rem 0;
    margin-left: 1rem;

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
.isActive > p {
  display: block;
  color: black;
  background-color: #ccc;

  & .subMenuIcon {
    margin-right: 5px;
    display: inline !important;
  }
}
</style>
