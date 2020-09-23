import axios from "axios";

export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

export class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }

  static send() {
    return axios.post("/users.json").then((resp) => resp.data);
  }
}
