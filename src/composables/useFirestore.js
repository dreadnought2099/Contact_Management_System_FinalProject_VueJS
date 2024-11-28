import { ref } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useFirestore(collectionName) {
  const items = ref([]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, collectionName));
    items.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const addItem = async (data) => {
    try {
      const itemName = data.name || "Unnamed Item";
      const confirmed = window.confirm(
        `Are you sure you want to add the item: ${itemName}?`
      );

      if (confirmed) {
        await addDoc(collection(db, collectionName), data);
        fetchItems(); // Refresh the list after adding the item
      } else {
        // If user cancels, do nothing
        console.log("Item addition canceled");
      }
    } catch (error) {
      alert("Error adding item:", error); // Show error if something goes wrong
    }
  };

  const updateItem = async (id, updatedData) => {
    try {
      // Show a confirmation dialog
      const confirmed = window.confirm(
        `Are you sure you want to update item with ID: ${id}?`
      );

      if (confirmed) {
        // If user confirms, proceed with updating
        const itemRef = doc(db, collectionName, id);
        await updateDoc(itemRef, updatedData);
        fetchItems(); // Refresh the list after update
      } else {
        // If user cancels, do nothing
        console.log("Item update canceled");
      }
    } catch (error) {
      alert("Error updating item:", error); // Show error if something goes wrong
    }
  };

  const deleteItem = async (id) => {
    try {
      // Show a confirmation dialog
      const confirmed = window.confirm(
        `Are you sure you want to delete item with ID: ${id}?`
      );

      if (confirmed) {
        // If user confirms, proceed with deletion
        const itemRef = doc(db, collectionName, id);
        await deleteDoc(itemRef);
        fetchItems(); // Refresh the list after deletion
      } else {
        // If user cancels, do nothing
        console.log("Item deletion canceled");
      }
    } catch (error) {
      alert("Error deleting item:", error); // Show error if something goes wrong
    }
  };

  return { items, fetchItems, addItem, updateItem, deleteItem };
}
