import { renderHook, act } from "@testing-library/react-hooks";
import { useResize } from "./useResize";

const getHookResult = () => renderHook(() => useResize());

describe("test useResize hooks", () => {
  it("should return currentWidth is number type", () => {
    const { result } = getHookResult();

    expect(typeof result.current.currentWidth).toBe("number");
  });

  it("should return getVisibility is function type", () => {
    const { result } = getHookResult();

    expect(typeof result.current.getVisibility).toBe("function");
  });

  it("should call useEffect with currentWidth has been updated", () => {
    global.window.innerWidth = 500;
    const { result } = getHookResult();

    expect(result.current.currentWidth).toBe(500);

    act(() => {
      global.window.innerWidth = 1000;
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.currentWidth).toBe(1000);
  });

  it("should call getVisibility", () => {
    global.window.innerWidth = 500;
    const { result } = getHookResult();

    act(() => {
      expect(result.current.getVisibility(300)).toBe(true);

      global.window.innerWidth = 1000;
      global.dispatchEvent(new Event("resize"));
    });

    act(() => {
      expect(result.current.getVisibility(1200)).toBe(false);
    });
  });
});
