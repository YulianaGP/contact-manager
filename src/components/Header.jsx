// src/Header.jsx
import "../Header.css";

export default function Header({ totalFavoritos }) {
  return (
    <header className="header">
      <h1>📞 Contact Manager</h1>
      <p>⭐ Favoritos: {totalFavoritos}</p>
    </header>
  );
}

