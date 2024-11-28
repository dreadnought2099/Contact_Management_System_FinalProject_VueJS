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
          type="tel"
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
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { useFirestore } from "@/composables/useFirestore";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const { addItem, updateItem, fetchItems, items } = useFirestore("contacts");
    const route = useRoute();
    const router = useRouter();

    const isEdit = ref(!!route.params.id); // Determine if it's Edit mode
    const formData = ref({ name: "", email: "", phone: "" });
    const isFetching = ref(false);

    // Reset the form data after submission
    const resetFormData = () => {
      formData.value = { name: "", email: "", phone: "" };
      // localStorage.removeItem("formData"); // Optional: Clear saved form data after successful submission
    };

    // Handle form submission (either add or update)
    const handleSubmit = async () => {
      try {
        if (isEdit.value) {
          await updateItem(route.params.id, formData.value); // Update contact in Firestore
        } else {
          await addItem(formData.value); // Add new contact to Firestore
        }
        resetFormData(); // Reset form data after submission
        router.push("/contacts"); // Navigate back to contacts list
      } catch (error) {
        console.error("Error during form submission:", error);
        // Optionally show an error message to the user
      }
    };

    // Fetch contact data when editing or load saved form data for new contact
    onMounted(async () => {
      if (isEdit.value && !isFetching.value) {
        isFetching.value = true;
        await fetchItems(); // Fetch contacts
        const contact = items.value.find((c) => c.id === route.params.id);
        if (contact) {
          Object.assign(formData.value, contact); // Pre-fill form with contact data
        }
        isFetching.value = false;
      } else {
        // Load saved form data if available (e.g., after a page refresh)
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
          Object.assign(formData.value, JSON.parse(savedFormData));
        }
      }
    });

    // Watch the form data and save it to localStorage
    watch(
      formData,
      (newData) => {
        localStorage.setItem("formData", JSON.stringify(newData)); // Save form data to localStorage
      },
      { deep: true }
    );

    // Clean up saved form data when component is unmounted or user navigates away
    onBeforeUnmount(() => {
      localStorage.removeItem("formData"); // Clear localStorage data when the component is unmounted
    });

    return { formData, handleSubmit, isEdit };
  },
};
</script>
