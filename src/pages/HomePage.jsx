import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>📱 Contact Manager</h1>
      <p>Aplicación con React Router</p>

      <Link to="/contacts">Ver contactos</Link>
    </div>
  );
}
