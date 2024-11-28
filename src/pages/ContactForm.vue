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
import { useFirestore } from "@/composables/useFirestore";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const { addItem, updateItem, fetchItems, items } = useFirestore("contacts");
    const route = useRoute();
    const router = useRouter();

    const isEdit = ref(!!route.params.id);
    const formData = ref({ name: "", email: "", phone: "" });

    const resetFormData = () => {
      formData.value = { name: "", email: "", phone: "" }; // Clear inputs
      localStorage.removeItem("formData"); // Optional: Clear saved form data
    };

    onMounted(() => {
      if (isEdit.value) {
        // Fetch the contact from the `items` array or Firestore
        const contact = items.value.find((c) => c.id === route.params.id);
        if (contact) {
          Object.assign(formData.value, contact);
        } else {
          // Fallback: fetch the contact from Firestore if not in local state
          fetchItems().then(() => {
            const contact = items.value.find((c) => c.id === route.params.id);
            if (contact) Object.assign(formData.value, contact);
          });
        }
      } else {
        // Load unsaved form data for new contact
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
          Object.assign(formData.value, JSON.parse(savedFormData));
        }
      }
    });

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
-->

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
import { ref, onMounted } from "vue";
import { useFirestore } from "@/composables/useFirestore";
import { useRoute, useRouter } from "vue-router";
// import { useFirestore } from "../composables/useFirestore";

export default {
  setup() {
    const { addItem, updateItem, fetchItems, items } = useFirestore("contacts");
    const route = useRoute();
    const router = useRouter();

    const isEdit = ref(!!route.params.id);
    const formData = ref({ name: "", email: "", phone: "" });

    onMounted(() => {
      if (isEdit.value) {
        const contact = items.value.find((c) => c.id === route.params.id);
        if (contact) Object.assign(formData.value, contact);
      } else {
        fetchItems(); // Load items for validation, if needed
      }
    });

    const handleSubmit = async () => {
      if (isEdit.value) {
        // Update the contact in Firestore
        await updateItem(route.params.id, formData.value);

        // Update the contact in the local items array (optional, depending on useFirestore implementation)
        const index = items.value.findIndex(
          (item) => item.id === route.params.id
        );
        if (index !== -1) {
          items.value[index] = { ...items.value[index], ...formData.value };
        }
      } else {
        // Add the new contact to Firestore
        await addItem(formData.value);
      }

      resetFormData(); // Clear the form after submission
      router.push("/contacts"); // Navigate back to contacts list
    };

    return { formData, handleSubmit, isEdit };
  },
};
</script>
