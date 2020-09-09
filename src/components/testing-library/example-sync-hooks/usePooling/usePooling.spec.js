import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";

import { usePooling } from "./usePooling";

const getHookResult = (query, status, time) =>
  renderHook(() => usePooling(query, status, time));

const status = "PENDING";

const mockQueryResult = {
  count: 0,
  loading: false,
  startPolling: function (interval) {
    let timer;
    if (this.count === 3) {
      clearInterval(timer);
      this.stopPolling();
      return;
    }

    this.loading = true;
    this.count = this.count + 1;

    if (!timer) {
      timer = setInterval(() => {
        this.startPolling();
      }, interval);
    }
  },
  stopPolling: function () {
    this.loading = false;
  },
};

beforeEach(() => {
  mockQueryResult.count = 0;
  mockQueryResult.loading = false;
});

describe("test usePooling hooks", () => {
  it("should call hook", async () => {
    expect(mockQueryResult.loading).toBe(false);

    getHookResult(mockQueryResult, status, 500);

    expect(mockQueryResult.loading).toBe(true);

    await waitFor(() => expect(mockQueryResult.loading).toBe(false));

    expect(mockQueryResult.count).toBe(3);
  });

  it("should call hook with loading", () => {
    const query = { loading: true };
    getHookResult(query);

    expect(query.loading).toBe(true);
  });

  it("should call hook with loading false", () => {
    const query = { loading: false };
    getHookResult(query);

    expect(query.loading).toBe(false);
  });

  it("should call hook with finish status", () => {
    getHookResult(mockQueryResult, "FINISH", 500);

    expect(mockQueryResult.loading).toBe(false);
  });

  it("should call hook without time", () => {
    getHookResult(mockQueryResult, status);

    expect(mockQueryResult.loading).toBe(true);
  });
});
