<template>
  <div>
    <Header />
    <slot />
    <Subscribe />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./Header.vue";
import Subscribe from "./Subscribe.vue";
import Footer from "./Footer.vue";
@Component({
  components: {
    Header,
    Subscribe,
    Footer
  }
})
export default class Wrapper extends Vue {}
</script>
