import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function PokemonDeleteAPI(token, id) {
  const res = await fetch(`${BASE_URL}/pokemons/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return readResponse(res, "Failed to delete pokemon");
}
