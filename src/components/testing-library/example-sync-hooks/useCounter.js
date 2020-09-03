import { useState, useCallback, useEffect } from "react";

export function useCounter(value = 0) {
  const [count, setCount] = useState(value);
  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const reset = useCallback(() => setCount(value), [value]);

  return { count, increment, reset };
}
