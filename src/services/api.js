import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/EdilsonJunior-2/debt-project",
});

export const usersApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});
