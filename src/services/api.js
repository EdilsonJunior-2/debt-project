import axios from "axios";

export const api = axios.create({
  baseURL: "https://provadev.xlab.digital/api/v1",
});

export const usersApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

export const uuid = "4625f98a-29fc-43a1-aac1-56f293987837";
