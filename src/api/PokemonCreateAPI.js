import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function PokemonCreateAPI(token, formData) {
  const res = await fetch(`${BASE_URL}/pokemons/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return readResponse(res, "Failed to create pokemon");
}
