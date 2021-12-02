export const apiCallsInit = (noOfApiCalls, apiUrl) => {
  return [...new Array(noOfApiCalls)].map((_el, index) => ({
    id: index + 1,
    url: apiUrl
  }));
};
