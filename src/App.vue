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
  min-height: 100vh; /* Ensure it takes the full height of the viewport */
}
.main-content {
  flex: 1; /* Grow to fill available space, pushing footer to the bottom */
  padding: 20px; /* Optional: Add padding for content spacing */
}

body {
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
