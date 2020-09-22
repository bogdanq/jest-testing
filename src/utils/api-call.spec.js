import { getUser, wait } from "./api-call";

import { waitFor } from "@testing-library/react";

const mockData = { id: 1 };

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => wait(mockData));
});

afterEach(() => {
  global.fetch.mockClear();
});

describe("test utils", () => {
  it("should call getUser", async () => {
    const data = await getUser();

    await waitFor(() => expect(data).toStrictEqual(mockData));
  });
});
