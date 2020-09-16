import { renderHook, act } from "@testing-library/react-hooks";
import { usePermissions, onlyManager, onlyAdmin } from "./index";

describe("usePermissions test", () => {
  it("should call hook with manager permission", () => {
    const { result } = renderHook(() => usePermissions());

    act(() => {
      expect(result.current.checkPermissions([onlyManager])).toBe(true);
    });
  });

  it("should call hook with admin permission", () => {
    const { result } = renderHook(() => usePermissions());

    act(() => {
      expect(result.current.checkPermissions([onlyAdmin])).toBe(false);
    });
  });

  describe("should call chec permission helpers", () => {
    it("should call onlyManager with permission", () => {
      expect(
        onlyManager({
          permissions: ["Manager"],
        })
      ).toBe(true);
    });

    it("should call onlyManager without permission", () => {
      expect(onlyManager()).toBe(false);
    });

    it("should call onlyAdmin with permission", () => {
      expect(
        onlyAdmin({
          permissions: ["Admin"],
        })
      ).toBe(true);
    });

    it("should call onlyAdmin without permission", () => {
      expect(onlyAdmin()).toBe(false);
    });
  });
});
