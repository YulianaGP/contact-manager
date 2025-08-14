// InformacionContacto.jsx
import ContactCard from "./ContactCard";

export default function InformacionContacto({
  selectedContact,
  toggleFavorite,
  onClearContact,
  onNextContact,
  onDeleteContact,
  onEditContact, // 👈 Agregado para manejar edición
}) {
  if (!selectedContact) {
    return (
      <section className="contact-detail">
        <h2>Contacto Actual</h2>
        <p style={{ color: "#999" }}>No hay contacto seleccionado.</p>
      </section>
    );
  }

  return (
    <section className="contact-detail">
      <h2>Contacto Actual</h2>

      <ContactCard
        contact={selectedContact}
        onToggleFavorite={toggleFavorite}
        onDeleteContact={onDeleteContact}
      />

      <button onClick={onClearContact} style={{ marginTop: 12 }}>
        🗑️ Limpiar contacto
      </button>

      <button onClick={onNextContact}>
        Siguiente contacto
      </button>

      {/* 👇 Ahora usa selectedContact y la función pasada como prop */}
      <button onClick={() => onEditContact(selectedContact)}>✏️ Editar</button>
    </section>
  );
}
