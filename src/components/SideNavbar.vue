<template>
  <nav class="side-navbar">
    <div @click="handleChange" class="close-navbar">x</div>
    <h3 class="side-navbar-logo">
      <router-link to="/">
        <b @click="handleChange">LOGO</b>
      </router-link>
    </h3>
    <div class="navbar-list">
      <ul>
        <li>
          <router-link active-class="isActive" to="/category/shirts">
            <p @click="handleChange">Shirts</p>
          </router-link>
        </li>
        <li>
          <router-link active-class="isActive" to="/category/dresses">
            <p @click="handleChange">Dresses</p>
          </router-link>
        </li>
        <li>
          <p @click="isJeansOpen = !isJeansOpen">
            Jeans <i class="navIcon fa fa-caret-down"></i>
          </p>
          <div class="subMenu" v-if="isJeansOpen">
            <router-link active-class="isActive" to="/category/jeans/skinny">
              <p @click="handleChange">
                <i class="subMenuIcon fa fa-caret-right"></i>
                Skinny
              </p>
            </router-link>
            <router-link active-class="isActive" to="/category/jeans/relaxed">
              <p @click="handleChange">
                <i class="subMenuIcon fa fa-caret-right"></i>
                Relaxed
              </p>
            </router-link>
            <router-link active-class="isActive" to="/category/jeans/bootcut">
              <p @click="handleChange">
                <i class="subMenuIcon fa fa-caret-right"></i>
                Bootcut
              </p>
            </router-link>
            <router-link active-class="isActive" to="/category/jeans/straight">
              <p @click="handleChange">
                <i class="subMenuIcon fa fa-caret-right"></i>
                Straight
              </p>
            </router-link>
          </div>
        </li>
        <li>
          <router-link active-class="isActive" to="/category/jackets">
            <p @click="handleChange">Jackets</p>
          </router-link>
        </li>
        <li>
          <router-link active-class="isActive" to="/category/gymwear">
            <p @click="handleChange">Gymwear</p>
          </router-link>
        </li>
        <li>
          <router-link active-class="isActive" to="/category/blazers">
            <p @click="handleChange">Blazers</p>
          </router-link>
        </li>
        <li>
          <router-link active-class="isActive" to="/category/shoes">
            <p @click="handleChange">Shoes</p>
          </router-link>
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
@import "@/styles/config.scss";
.side-navbar {
  flex-shrink: 0;
  width: 250px;
  font-family: $font-secondary;
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

  & .close-navbar {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    background-color: black;
    padding: 10px;
    height: 30px;
    width: 30px;
    line-height: 0;

    @media screen and (max-width: 1000px) {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
    font-family: $font-primary;
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
