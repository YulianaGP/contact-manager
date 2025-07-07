// ContactList.jsx
export default function ContactList({
  contacts,
  selectedId,
  onSelectContact,
}) {
  if (!contacts.length) return <p>No hay contactos para mostrar</p>;

  return (
    <section>
      {contacts.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectContact(c.id)}
          style={{
            margin: 4,
            padding: "4px 8px",
            border:
              c.id === selectedId ? "2px solid var(--color-primary)" : "1px solid #ccc",
            background: c.isFavorite ? "#fff9db" : "#f0f0f0",
          }}
        >
          {c.name} {c.isFavorite ? "⭐" : "☆"}
        </button>
      ))}
    </section>
  );
}
