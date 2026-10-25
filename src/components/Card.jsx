import { typeLabel } from "../utils/pokemonTypes";

export default function Card({ pokemon, onEdit, onDelete }) {
  const { id, name, description, avatar, background, level, type, health, attack, defense, speed } = pokemon;

  const stats = [
    ["HP", health],
    ["ATK", attack],
    ["DEF", defense],
    ["SPD", speed],
  ];

  return (
    <div className="overflow-hidden rounded-xl bg-white text-slate-900 shadow">
      <div
        className="flex h-40 items-center justify-center bg-slate-300 bg-cover bg-center"
        style={background ? { backgroundImage: `url(${background})` } : undefined}
      >
        {avatar && <img src={avatar} alt={name} className="h-28 w-28 rounded-full border-2 border-white object-cover" />}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">#{id}</span>
          <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs text-red-700">{typeLabel(type)}</span>
        </div>

        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-slate-500">Lv. {level}</p>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}

        <div className="my-3 grid grid-cols-4 gap-2 text-center text-xs">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-slate-100 py-1">
              <p className="text-slate-400">{label}</p>
              <p className="font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(pokemon)}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(pokemon)}
            className="rounded-lg border px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
