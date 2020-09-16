import { useCallback } from "react";

export function useUser() {
  return {
    name: "test 1",
    permissions: ["Manager"],
  };
}

export function usePermissions() {
  const user = useUser();

  const checkPermissions = useCallback(
    (guards) => guards.every((item) => item(user)),
    [user]
  );

  return { checkPermissions };
}

// checkPermissions(guards)

export function onlyManager(user) {
  if (user && user.permissions) {
    return user.permissions.includes("Manager");
  }

  return false;
}

export function onlyAdmin(user) {
  if (user && user.permissions) {
    return user.permissions.includes("Admin");
  }

  return false;
}
