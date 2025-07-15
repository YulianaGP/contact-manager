// src/Header.jsx
import "../Header.css";

export default function Header({ totalContacts, totalFavoritos }) {
  return (
    <header className="header">
      <h1>📞 Contact Manager</h1>
      <p>👥 Total: {totalContacts} | ⭐ Favoritos: {totalFavoritos}</p>
    </header>
  );
}

