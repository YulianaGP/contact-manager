export default function Header({ totalContacts, totalFavoritos }) {
  return (
    <header className="bg-white/20 p-4 shadow-md flex flex-col items-center mb-6">
      <h1>📞 Contact Manager</h1>
      <p>👥 Total: {totalContacts} | ⭐ Favoritos: {totalFavoritos}</p>
    </header>
  );
}

