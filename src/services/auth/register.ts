import { API_URL } from "../../constants";
import { IUser } from "../../interfaces/user";

export async function register(name: string, email: string, password: string) {
  const userToRegister = {
    name,
    email,
    password,
  };

  // console.log({
  //   userToRegisterAsString: JSON.stringify(userToRegister),
  //   userToRegister,
  // });

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToRegister),
    });
    
    if (!response.ok)
      throw new Error(`${response.status}: ${response.statusText}`);
    
    return await response.json() as IUser
  } catch (err) {
    console.error("Error registrando el usuario", err);
    throw err;
  }
}