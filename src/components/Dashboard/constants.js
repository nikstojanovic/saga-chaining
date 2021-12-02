export const DEFAULT_SERVER = "https://jsonplaceholder.typicode.com/users";
export const MIN_API_CALLS = 10;
export const MAX_API_CALLS = 100;
export const API_INPUT_PROPS = {
  type: "text",
  label: "API endpoint:",
  placeholder: `API endpoint, ex. ${DEFAULT_SERVER}`,
  style: { width: "400px" }
};
export const NUMBER_INPUT_PROPS = {
  type: "number",
  label: `No of API calls [min ${MIN_API_CALLS}, max ${MAX_API_CALLS}]:`,
  placeholder: "Number of API calls",
  min: MIN_API_CALLS,
  max: MAX_API_CALLS
};
