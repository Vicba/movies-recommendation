import { useState, useEffect } from "react";

// export default function useLocalStorage<T>(
//   key: string,
//   initialValue: T
// ): [T, (value: T) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(storedValue));
//   }, [key, storedValue]);

//   const setValue = (value: T) => {
//     setStoredValue(value);
//   };

//   return [storedValue, setValue];
// }

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } else {
      // Handle non-browser environment
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  const setValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
