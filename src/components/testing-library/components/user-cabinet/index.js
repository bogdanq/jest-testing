import React from "react";
import { useUser } from "../../hooks-with-query/useUser";

export function UserCabinet() {
  const { user, pending } = useUser();

  if (pending) {
    return <h1>pending</h1>;
  }

  if (!user) {
    return <h1>user is not defined</h1>;
  }

  return (
    <div>
      <h1>{user.login}</h1>
    </div>
  );
}
