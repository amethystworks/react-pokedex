import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { LoginAPI } from "../api/LoginAPI";
import { getToken, saveLogin } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // already logged in -> go straight to the Gallery
  if (getToken()) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { access } = await LoginAPI(form.username, form.password);
      saveLogin(access, form.username);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-slate-900 p-8">
        <h1 className="text-2xl font-bold">Login</h1>

        {error && <p className="rounded-lg bg-red-100 p-2 text-sm text-red-700">{error}</p>}

        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className={inputStyle} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className={inputStyle} />

        <button disabled={isLoading} className="w-full rounded-lg bg-red-600 py-2 hover:bg-red-700 disabled:opacity-50">
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          No account yet? <Link to="/register" className="text-red-400 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
