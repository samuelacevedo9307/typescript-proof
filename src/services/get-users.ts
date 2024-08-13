import { API_URL } from "../constants";
import { IUser } from "../interfaces/user";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  const users: IUser[] = await response.json();
  return users;
}
