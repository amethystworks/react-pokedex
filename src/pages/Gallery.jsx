import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FormPokemon from "../components/FormPokemon";
import GalleryPokemon from "../components/GalleryPokemon";
import { PokemonListAPI } from "../api/PokemonListAPI";
import { PokemonCreateAPI } from "../api/PokemonCreateAPI";
import { PokemonUpdateAPI } from "../api/PokemonUpdateAPI";
import { PokemonDeleteAPI } from "../api/PokemonDeleteAPI";
import { clearLogin, getToken } from "../utils/auth";

export default function Gallery() {
  const navigate = useNavigate();
  const token = getToken();

  const [pokemons, setPokemons] = useState([]);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(null); // list could not be loaded
  const [message, setMessage] = useState(null); // feedback for create/update/delete

  // token expired or invalid -> sign out and go to Login
  const handleUnauthorized = () => {
    clearLogin();
    navigate("/login");
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await PokemonListAPI(token);
        setPokemons(data);
      } catch (err) {
        if (err.status === 401) {
          clearLogin();
          navigate("/login");
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, navigate]);

  // CREATE or UPDATE, depending on editingPokemon
  const savePokemon = async (formData) => {
    setMessage(null);
    setSaving(true);

    try {
      if (editingPokemon) {
        const updated = await PokemonUpdateAPI(token, editingPokemon.id, formData);
        setPokemons(pokemons.map((p) => (p.id === updated.id ? updated : p)));
        setEditingPokemon(null);
        setMessage({ type: "success", text: "Pokémon updated!" });
      } else {
        const created = await PokemonCreateAPI(token, formData);
        setPokemons([...pokemons, created]);
        setMessage({ type: "success", text: "Pokémon added!" });
      }
      return true;
    } catch (err) {
      if (err.status === 401) handleUnauthorized();
      else setMessage({ type: "error", text: err.message });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deletePokemon = async (pokemon) => {
    if (!window.confirm(`Delete ${pokemon.name}?`)) return;
    setMessage(null);

    try {
      await PokemonDeleteAPI(token, pokemon.id);
      setPokemons(pokemons.filter((p) => p.id !== pokemon.id));
      if (editingPokemon?.id === pokemon.id) setEditingPokemon(null);
      setMessage({ type: "success", text: "Pokémon deleted!" });
    } catch (err) {
      if (err.status === 401) handleUnauthorized();
      else setMessage({ type: "error", text: err.message });
    }
  };

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-400">Error: {error}</p>;
  }

  return (
    <div className="flex-1 p-4">
      {message && (
        <p
          className={`mb-4 rounded-lg p-3 text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <FormPokemon
        key={editingPokemon?.id ?? "new"}
        editingPokemon={editingPokemon}
        onSave={savePokemon}
        onCancelEdit={() => setEditingPokemon(null)}
        isSaving={isSaving}
      />

      <GalleryPokemon pokemons={pokemons} onEdit={setEditingPokemon} onDelete={deletePokemon} />
    </div>
  );
}
