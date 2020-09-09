import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter, CounterStepProvider } from "./useCounter";

describe("test useCounter hooks", () => {
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

  test("should increment counter after delay", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCounter());

    result.current.incrementAsync();

    await waitForNextUpdate();

    expect(result.current.count).toBe(1);
  });

  test("should throw when over 900", () => {
    const { result } = renderHook(() => useCounter(9000));

    act(() => {
      result.current.increment();
    });

    expect(result.error).toEqual(Error("It's over 9000!"));
  });

  describe("shoul call hook in test provider", () => {
    it("should use step with increment", () => {
      const wrapper = ({ children }) => (
        <CounterStepProvider step={2}>{children}</CounterStepProvider>
      );

      const { result } = renderHook(() => useCounter(1), { wrapper });

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(3);
    });

    it("should use custom step with increment", () => {
      const wrapper = ({ children, step }) => (
        <CounterStepProvider step={step}>{children}</CounterStepProvider>
      );

      const { result, rerender } = renderHook(() => useCounter(2), {
        wrapper,
        initialProps: {
          step: 2,
        },
      });

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(4);

      rerender({ step: 8 });

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(12);
    });
  });
});
