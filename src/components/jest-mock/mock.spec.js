const mockModules = jest.createMockFromModule("./axios");

//jest.mock(../foo) - мокает модули
// import f from ../foo
// f() => undefined , потому что она замокана
// f.mockImplementation((a, b) => a * b);

// jest.resetModules() - сброс состояние перед каждым тестом

// TODO - вынести в readme

/**
 * 
    Фабрика моков 
  jest.mock('../moduleName', () => {
    return {
      __esModule: true,
      default: jest.fn(() => 42),
      foo: jest.fn(() => 43),
    }
  });

  moduleName() // => 42
  foo() // => 43
 */

describe("mock tests", () => {
  it("should call getData", async () => {
    const resolvedValue = { url: "/test", data: "some data" };
    mockModules.getData.mockResolvedValue(resolvedValue);

    expect(await mockModules.getData("/test")).toStrictEqual(resolvedValue);
  });

  it("async test", async () => {
    const asyncMock = jest
      .fn()
      .mockReturnValue(122)
      .mockReturnValueOnce(13)
      .mockReturnValueOnce(12);

    expect(await asyncMock()).toBe(13);
    expect(await asyncMock()).toBe(12);
    expect(await asyncMock()).toBe(122);
  });

  it("mock implementation", async () => {
    const asyncMock = jest
      .fn()
      .mockImplementation((a) => Promise.resolve(a ** 2));

    expect(await asyncMock(2)).toBe(4);
    expect(await asyncMock(3)).toBe(9);
  });

  it("should run mockModules code", () => {
    console.log(mockModules.test.function(2, 2));
    expect(mockModules.test.function.name).toBe("square");
    expect(mockModules.test.function.length).toBe(0);

    // асинхронные функции выполняет как синхронные
    expect(mockModules.test.asyncFunction.name).toBe("asyncSquare");
    expect(mockModules.test.asyncFunction.length).toBe(0);

    // создает новый класс стаким же интерфейсом, чьи своиства имитируются
    expect(mockModules.test.class.constructor.name).toBe("Bar");
    expect(mockModules.test.class.foo.name).toBe("foo");
    expect(mockModules.test.class.array.length).toBe(0);

    // создает глубоко клонированную версию обьекта
    expect(mockModules.test.object).toEqual({
      baz: "foo",
      bar: {
        fiz: 1,
        buzz: [],
      },
    });

    // создает новый массив, игнорируя исходный
    expect(mockModules.test.array.length).toBe(0);

    // создает примитивы с такими же значениями
    expect(mockModules.test.number).toBe(123);
    expect(mockModules.test.string).toBe("baz");
    expect(mockModules.test.boolean).toBe(true);
    expect(mockModules.test.symbol).toEqual(Symbol.for("a.b.c"));
  });
});
