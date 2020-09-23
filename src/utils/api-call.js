export const user = { id: 1, name: "Bogdan" };

export async function getUser() {
  const response = await fetch("https://api.github.com/orgs/nodejs");

  return await response.json();
}

export function wait(mockData) {
  return new Promise(function (resolve) {
    return resolve({
      json: () => {
        return mockData;
      },
    });
  });
}
/**
 * TODO - вынести в readme
 *  при моках, jest подменяет все функции на свой обьект, куда можно усановить значение
_isMockFunction: true,
getMockImplementation: [Function (anonymous)],
mock: [Getter/Setter],
mockClear: [Function (anonymous)],
mockReset: [Function (anonymous)],
mockRestore: [Function (anonymous)],
mockReturnValueOnce: [Function (anonymous)],
mockResolvedValueOnce: [Function (anonymous)],
mockRejectedValueOnce: [Function (anonymous)],
mockReturnValue: [Function (anonymous)],
mockResolvedValue: [Function (anonymous)],
mockRejectedValue: [Function (anonymous)],
mockImplementationOnce: [Function (anonymous)],
mockImplementation: [Function (anonymous)],
mockReturnThis: [Function (anonymous)],
mockName: [Function (anonymous)],
getMockName: [Function (anonymous)]
 */
