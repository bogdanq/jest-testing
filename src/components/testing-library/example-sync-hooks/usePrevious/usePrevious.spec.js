import { renderHook } from "@testing-library/react-hooks";

import { usePrevious } from "./index";

async function checkWithTimeout(toBe, result, waitForNextUpdate) {
  try {
    await waitForNextUpdate({ timeout: 100 });
  } catch (err) {
    expect(err.timeout).toBeTruthy();
  }

  expect(result.current).toBe(toBe);
}

describe("usePrevious test", () => {
  it("should call hook", async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ initialValue }) => usePrevious(initialValue),
      {
        initialValue: 0,
      }
    );

    rerender({ initialValue: 1 });

    await checkWithTimeout(undefined, result, waitForNextUpdate);

    rerender({ initialValue: 2 });

    await checkWithTimeout(1, result, waitForNextUpdate);

    rerender({ initialValue: 3 });

    await checkWithTimeout(2, result, waitForNextUpdate);
  });
});
