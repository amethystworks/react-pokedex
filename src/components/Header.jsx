import { useNavigate } from "react-router";
import { clearLogin, getUsername } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();

  function handleSignOut() {
    clearLogin();
    navigate("/login");
  }

  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-red-500">Pokédex</h1>

      <div className="flex items-center gap-5">
        <p>{getUsername()}</p>
        <button
          onClick={handleSignOut}
          className="rounded-lg bg-red-600 px-4 py-1 hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
