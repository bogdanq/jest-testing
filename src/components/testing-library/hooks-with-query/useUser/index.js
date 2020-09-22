import { useState, useEffect } from "react";
import { getUser } from "../../../../utils/api-call";

export const useUser = () => {
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState(null);

  async function fetchData() {
    const data = await getUser();

    if (data) {
      setUser(data);
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { pending, user };
};
