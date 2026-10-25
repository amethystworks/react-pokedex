import { Outlet } from "react-router";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col px-6 md:px-20">
      <Header />

      <main className="bg-slate-900 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
