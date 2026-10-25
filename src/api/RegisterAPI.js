import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function RegisterAPI(user) {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      confirm_password: user.confirm_password,
    }),
  });

  return readResponse(res, "Registration failed!");
}
