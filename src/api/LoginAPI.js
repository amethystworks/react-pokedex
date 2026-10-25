import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function LoginAPI(username, password) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // returns { access, refresh }
  return readResponse(res, "Login failed!");
}
