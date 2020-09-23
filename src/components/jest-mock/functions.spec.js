import axios from "axios";

import { forEach, Users } from "./functions";

jest.mock("axios");

// TODO

describe("test functions", () => {
  it("call forEach function with mock callback", () => {
    const mockCb = jest.fn((i) => i ** 2);
    forEach([1, 2], mockCb);

    expect(mockCb.mock.calls.length).toBe(2);

    // проверить аргументы всех вызовов функции
    expect(mockCb.mock.calls[0][0]).toBe(1);
    expect(mockCb.mock.calls[1][0]).toBe(2);

    // проверить результаты всех вызовов функции
    expect(mockCb.mock.results[0].value).toBe(1);
    expect(mockCb.mock.results[1].value).toBe(4);
  });

  it("get mock return value", () => {
    const mockCb = jest.fn((i) => i ** 2);
    mockCb.mockReturnValue(1).mockReturnValueOnce(2);

    expect(mockCb()).toBe(2);
    expect(mockCb()).toBe(1);
  });

  it("should call Users methood all", async () => {
    const users = [{ name: "Bob" }];

    axios.get.mockResolvedValue({ data: users });

    const data = await Users.all();

    expect(data).toEqual(users);
  });

  it("should call Users methood send", async () => {
    const users = [{ name: "Bob" }];

    axios.post.mockResolvedValue({ data: users });

    const data = await Users.send();

    expect(data).toEqual(users);
  });
});
