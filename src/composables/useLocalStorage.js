import { ref, watch } from "vue";

export function useLocalStorage(key, initialValue) {
  const storedValue = ref(
    JSON.parse(localStorage.getItem(key)) || initialValue
  );

  watch(
    storedValue,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return storedValue;
}
