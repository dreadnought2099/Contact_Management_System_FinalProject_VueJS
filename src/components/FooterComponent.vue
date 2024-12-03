<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} RMAGALLANEZ. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
<style scoped>
.footer {
  text-align: center;
}

.footer p {
  font-size: 12px;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
