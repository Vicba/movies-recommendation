import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
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

// // Example usage of the useLocalStorage hook in a component
// const ExampleComponent = () => {
//   const [name, setName] = useLocalStorage<string>("name", "");

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor="nameInput">Enter your name: </label>
//       <input
//         type="text"
//         id="nameInput"
//         value={name}
//         onChange={handleNameChange}
//       />
//       <p>Hello, {name ? name : "stranger"}!</p>
//     </div>
//   );
// };

// export default ExampleComponent;
