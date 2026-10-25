import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { RegisterAPI } from "../api/RegisterAPI";

const emptyForm = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirm_password: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await RegisterAPI(form);
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      // Django's own messages: weak password, username taken, ...
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-slate-900 p-8">
        <h1 className="text-2xl font-bold">Register</h1>

        {error && <p className="rounded-lg bg-red-100 p-2 text-sm text-red-700">{error}</p>}
        {success && <p className="rounded-lg bg-green-100 p-2 text-sm text-green-700">{success}</p>}

        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className={inputStyle} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputStyle} />
        <div className="flex gap-3">
          <input name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} className={inputStyle} />
          <input name="last_name" placeholder="Last name" value={form.last_name} onChange={handleChange} className={inputStyle} />
        </div>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className={inputStyle} />
        <input name="confirm_password" type="password" placeholder="Confirm password" value={form.confirm_password} onChange={handleChange} required className={inputStyle} />

        <button disabled={isLoading} className="w-full rounded-lg bg-red-600 py-2 hover:bg-red-700 disabled:opacity-50">
          {isLoading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-red-400 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
