<template>
  <div class="container mt-5">
    <h2>Contact List</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <router-link
              :to="{ name: 'edit-contact', params: { id: contact.id } }"
              class="btn btn-warning"
              >Edit</router-link
            >
            <button @click="deleteContact(contact.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/add-contact" class="btn btn-success"
      >Add New Contact</router-link
    >
  </div>
</template>

<script>
import { useContacts } from "../composables/useContacts";

export default {
  setup() {
    const { contacts, deleteContact } = useContacts();
    return { contacts, deleteContact };
  },
};
</script>
