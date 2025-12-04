import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center h-full gap-6">
      <h1 className="text-5xl font-bold">📱 Contact Manager</h1>
      <p>Aplicación con React Router</p>

      <Link to="/contacts">Ver contactos</Link>
    </main>
  );
}
