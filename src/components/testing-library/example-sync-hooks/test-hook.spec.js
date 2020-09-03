import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./useCounter";

describe("test sync hooks", () => {
  it("should use counter", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    expect(typeof result.current.increment).toBe("function");
  });

  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should increment counter with initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(11);
  });

  it("should reset counter", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      {
        initialValue: 0,
      }
    );

    rerender({ initialValue: 10 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
