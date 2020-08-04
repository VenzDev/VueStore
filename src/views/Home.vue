<template>
  <div>
    <Header />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({ components: { Header } })
export default class Home extends Vue {}
</script>
