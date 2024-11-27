<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
