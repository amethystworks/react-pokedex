import { BASE_URL } from "./config.js";
import { readResponse } from "./response.js";

export async function PokemonUpdateAPI(token, id, formData) {
  const res = await fetch(`${BASE_URL}/pokemons/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return readResponse(res, "Failed to update pokemon");
}
