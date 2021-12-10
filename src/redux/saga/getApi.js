export const getApi = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}