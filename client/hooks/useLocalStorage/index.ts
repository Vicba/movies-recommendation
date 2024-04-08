"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  // Function to update storedValue and localStorage
  const setValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

// export default function useLocalStorage<T>(
//   key: string,
//   initialValue: T
// ): [T, Dispatch<SetStateAction<T>>] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") return initialValue;
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   });

//   // Update localStorage whenever storedValue changes
//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(storedValue));
//   }, [key, storedValue]);

//   // Function to update storedValue and localStorage
//   const setValue: Dispatch<SetStateAction<T>> = (value) => {
//     setStoredValue(value);
//   };

//   return [storedValue, setValue];
// }
