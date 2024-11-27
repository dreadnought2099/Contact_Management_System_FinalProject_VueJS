<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/">Contact Manager</router-link>

      <!-- Toggler Button for Mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- Home -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active"
              >Home</router-link
            >
          </li>
          <!-- All Contacts -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/contacts"
              exact-active-class="active"
              >All Contacts</router-link
            >
          </li>
          <!-- Add Contact -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/add-contact"
              exact-active-class="active"
              >Add Contact</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
