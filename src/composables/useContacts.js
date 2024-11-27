import { ref } from "vue";
import { useLocalStorage } from "./useLocalStorage";

export function useContacts() {
  const contacts = useLocalStorage("contacts", []);
  const currentContact = ref(null);

  const addContact = (contact) => {
    contacts.value.push({ id: Date.now(), ...contact });
  };

  const updateContact = (id, updatedContact) => {
    const index = contacts.value.findIndex((c) => c.id === id);
    if (index !== -1) contacts.value[index] = { id, ...updatedContact };
  };

  const deleteContact = (id) => {
    contacts.value = contacts.value.filter((c) => c.id !== id);
  };

  const getContact = (id) => {
    currentContact.value = contacts.value.find((c) => c.id === id) || null;
  };

  return {
    contacts,
    currentContact,
    addContact,
    updateContact,
    deleteContact,
    getContact,
  };
}
