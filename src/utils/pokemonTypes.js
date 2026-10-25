// Same codes as TYPE_CHOICES in apps/pokemons/models.py
export const POKEMON_TYPES = [
  { value: "w", label: "Water" },
  { value: "f", label: "Fire" },
  { value: "l", label: "Light" },
  { value: "d", label: "Darkness" },
  { value: "ln", label: "Lightning" },
  { value: "r", label: "Rock" },
  { value: "n", label: "Nature" },
];

export function typeLabel(code) {
  return POKEMON_TYPES.find((t) => t.value === code)?.label ?? code;
}
