import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function PokemonListAPI(token) {
  const res = await fetch(`${BASE_URL}/pokemons/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return readResponse(res, "Failed to fetch pokemons");
}
