import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ContactList from "../pages/ContactList.vue";
import ContactForm from "../pages/ContactForm.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/contacts", component: ContactList },
  { path: "/add-contact", component: ContactForm },
  { path: "/edit-contact/:id", name: "edit-contact", component: ContactForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
