import { useEffect, useRef, useState } from "react";
import { POKEMON_TYPES } from "../utils/pokemonTypes";

const emptyForm = {
  name: "",
  description: "",
  type: "",
  level: "",
  health: "",
  attack: "",
  defense: "",
  speed: "",
  avatar: null,
  background: null,
};

// Minimum values come from the Django model validators
const numberFields = [
  { name: "level", label: "Level", min: 1 },
  { name: "health", label: "Health", min: 100 },
  { name: "attack", label: "Attack", min: 10 },
  { name: "defense", label: "Defense", min: 5 },
  { name: "speed", label: "Speed", min: 15 },
];

// The parent gives this form a `key`, so it starts fresh for every Pokémon
// that is being edited (or for a new one).
export default function FormPokemon({ editingPokemon, onSave, onCancelEdit, isSaving }) {
  const [form, setForm] = useState(
    editingPokemon
      ? {
          ...emptyForm,
          name: editingPokemon.name,
          description: editingPokemon.description ?? "",
          type: editingPokemon.type,
          level: editingPokemon.level,
          health: editingPokemon.health,
          attack: editingPokemon.attack,
          defense: editingPokemon.defense,
          speed: editingPokemon.speed,
        }
      : emptyForm,
  );
  const [error, setError] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, [editingPokemon]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] ?? null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.target;

    if (!form.name.trim() || !form.type) {
      setError("Name and type are required.");
      return;
    }
    setError("");

    // FormData is needed because we upload image files
    const body = new FormData();
    body.append("name", form.name.trim());
    body.append("description", form.description.trim());
    body.append("type", form.type);
    numberFields.forEach(({ name }) => body.append(name, form[name]));

    // no file chosen -> Django keeps / uses its default image
    if (form.avatar) body.append("avatar", form.avatar);
    if (form.background) body.append("background", form.background);

    const saved = await onSave(body);

    if (saved && !editingPokemon) {
      setForm(emptyForm);
      formElement.reset(); // clears the file inputs
      nameInputRef.current?.focus();
    }
  };

  const inputStyle =
    "w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 grid gap-4 rounded-xl bg-white p-6 text-slate-900 shadow sm:grid-cols-2"
    >
      <h2 className="text-lg font-bold sm:col-span-2">
        {editingPokemon ? `Edit ${editingPokemon.name}` : "Add Pokémon"}
      </h2>

      {error && (
        <p className="rounded-lg bg-red-100 p-2 text-sm text-red-700 sm:col-span-2">{error}</p>
      )}

      <div>
        <label htmlFor="name">Name</label>
        <input
          ref={nameInputRef}
          id="name"
          name="name"
          maxLength={50}
          value={form.name}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={form.type} onChange={handleChange} className={inputStyle}>
          <option value="">Select a type</option>
          {POKEMON_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      {numberFields.map(({ name, label, min }) => (
        <div key={name}>
          <label htmlFor={name}>
            {label} <span className="text-xs text-slate-400">(min {min})</span>
          </label>
          <input
            id={name}
            name={name}
            type="number"
            min={min}
            required
            value={form[name]}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
      ))}

      <div>
        <label htmlFor="avatar">Avatar {editingPokemon ? "(empty = keep current)" : "(optional)"}</label>
        <input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="background">Background {editingPokemon ? "(empty = keep current)" : "(optional)"}</label>
        <input
          id="background"
          type="file"
          name="background"
          accept="image/*"
          onChange={handleFileChange}
          className={inputStyle}
        />
      </div>

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : editingPokemon ? "Update Pokémon" : "Add Pokémon"}
        </button>
        {editingPokemon && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
