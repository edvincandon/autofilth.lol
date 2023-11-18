import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";

function getStorageValue<T>(key: string): T|null {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = localStorage.getItem(key);
  if (saved === null) {
    return null;
  }

  try {
    return JSON.parse(saved) as T;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const mounted = useRef(false);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (!mounted.current) {
      return;
    }

    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  useEffect(() => {
    const persistedValue = getStorageValue<T>(key);

    if (persistedValue !== null && JSON.stringify(persistedValue) !== JSON.stringify(value)) {
      setValue(persistedValue);
    }

    if (!mounted.current) {
      mounted.current = true;
    }
  }, [key, defaultValue, value]);

  return [value, setValue];
};
