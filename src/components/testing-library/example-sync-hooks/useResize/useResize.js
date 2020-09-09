import { useCallback, useEffect, useState } from "react";

export const useResize = () => {
  const [currentWidth, setCurrentWidth] = useState(1500);

  useEffect(() => {
    setCurrentWidth(window.innerWidth);

    const handleResizeCallback = () => setCurrentWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeCallback);
    return () => window.removeEventListener("resize", handleResizeCallback);
  }, []);

  const getVisibility = useCallback(
    (media) => (currentWidth < media ? false : true),
    [currentWidth]
  );

  return { currentWidth, getVisibility };
};
