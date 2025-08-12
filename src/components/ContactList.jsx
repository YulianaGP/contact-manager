// ContactList.jsx
import "../ContactList.css";

// Función para resaltar coincidencias
function highlight(text, query) {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

export default function ContactList({
  contacts,
  selectedId,
  onSelectContact,
  busqueda,
  isLoading,
  error,
  fetchContacts,
}) {

    if (isLoading) return <p>Cargando contactos...</p>;

  if (error)
    return (
      <div style={{ color: "red" }}>
        <p>Error al cargar contactos: {error.message}</p>
        <button onClick={fetchContacts}>Reintentar</button>
      </div>
    );

  if (!contacts || contacts.length === 0) return <p>No hay contactos para mostrar</p>;

  return (
    <section>
      {contacts.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectContact(Number(c.id))}
          style={{
            margin: 4,
            padding: "4px 8px",
            width: "100%",
            textAlign: "left",
            border:
              c.id === selectedId ? "2px solid var(--color-primary)" : "1px solid #ccc",
            background: c.id === selectedId
              ? "#d0ebff" // azul clarito si está seleccionado
              : c.isFavorite
              ? "#fff9db" // amarillo si es favorito
              : "#f0f0f0", // gris claro por defecto
            color: c.id === selectedId ? "#084298" : "black", // texto más oscuro si seleccionado
            fontWeight: c.id === selectedId ? "bold" : "normal",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          <div><strong>{highlight(c.fullname ?? "", busqueda)}</strong> {c.isFavorite ? "⭐" : "☆"}</div>
          <div>📞 {highlight(c.phonenumber ?? "", busqueda)}</div>
          {c.type && <div>📂 Tipo: {c.type}</div>}
          {c.company && <div>🏢 Empresa: {c.company}</div>}
          {c.birthday && <div>🎂 Cumpleaños: {c.birthday}</div>}
        </button>
      ))}  
    </section>
  );
}
