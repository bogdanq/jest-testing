import { renderHook } from "@testing-library/react-hooks";

import { getUser } from "../../../../utils/api-call";

jest.mock("../../../../utils/api-call");

import { useUser } from "./index";

describe("useUser hook", () => {
  it("should call hook check initial data state", () => {
    const { result } = renderHook(() => useUser());

    expect(result.current).toStrictEqual({ pending: true, user: null });
  });

  it("data is fetching", async () => {
    const user = { result: { id: 1, name: "Bogdan" } };
    getUser.mockResolvedValue(user);

    const { result, waitForNextUpdate } = renderHook(() => useUser());

    await waitForNextUpdate();

    expect(result.current).toStrictEqual({ pending: false, user });
  });
});
