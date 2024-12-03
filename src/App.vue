<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: {
    Navbar,
    FooterComponent,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 20px;
}

body {
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
