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
