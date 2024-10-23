import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, intialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof intialValue === "function") {
        return (intialValue as () => T)();
      } else {
        return intialValue;
      }
    } else {
      try {
        return JSON.parse(jsonValue);
      } catch {
        return intialValue;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, typeof setValue];
}
