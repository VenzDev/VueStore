<template>
  <div>
    <img class="image" :src="newCollectionUrl" alt="newCollection" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  newCollectionUrl = "https://www.w3schools.com/w3images/jeans.jpg";
}
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";
.image {
  width: 100%;
}
</style>
