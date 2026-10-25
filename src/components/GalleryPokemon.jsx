import Card from "./Card";

export default function GalleryPokemon({ pokemons, onEdit, onDelete }) {
  if (pokemons.length === 0) {
    return <p className="text-center text-slate-400">No Pokémon yet. Add one above!</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
