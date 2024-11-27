<template>
  <div class="container mt-5">
    <h2>{{ isEdit ? "Edit Contact" : "Add New Contact" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="formData.name"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="formData.email"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input
          type="text"
          class="form-control"
          v-model="formData.phone"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Update" : "Save" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useContacts } from "../composables/useContacts";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const { addContact, updateContact, getContact, currentContact } =
      useContacts();
    const route = useRoute();
    const router = useRouter();

    const isEdit = ref(!!route.params.id);
    const formData = ref({ name: "", email: "", phone: "" });

    // Load data from localStorage or existing contact (for edit mode)
    onMounted(() => {
      if (isEdit.value) {
        getContact(parseInt(route.params.id));
        Object.assign(formData.value, currentContact.value);
      } else {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
          Object.assign(formData.value, JSON.parse(savedFormData));
        }
      }
    });

    // Save formData to localStorage on changes
    watch(
      formData,
      (newData) => {
        localStorage.setItem("formData", JSON.stringify(newData));
      },
      { deep: true }
    );

    const handleSubmit = () => {
      if (isEdit.value) {
        updateContact(route.params.id, formData.value);
      } else {
        addContact(formData.value);
      }
      // Clear localStorage after successful submission
      localStorage.removeItem("formData");
      router.push("/contacts");
    };

    return { formData, handleSubmit, isEdit };
  },
};
</script>
