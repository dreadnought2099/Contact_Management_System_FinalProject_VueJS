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
    await addDoc(collection(db, collectionName), data);
    fetchItems();
  };

  const updateItem = async (id, data) => {
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, data);
    fetchItems();
  };

  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, collectionName, id);
      await deleteDoc(itemRef);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return { items, fetchItems, addItem, updateItem, deleteItem };
}
