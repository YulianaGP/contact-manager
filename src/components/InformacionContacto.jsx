import ContactCard from "./ContactCard";


export default function InformacionContacto({ selectedContact, toggleFavorite, onClearContact, onNextContact}) {
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
      />

      <button onClick={onClearContact} style={{ marginTop: 12 }}>
        🗑️ Limpiar contacto
      </button>

      <button onClick={onNextContact}>
          Siguiente contacto
      </button>

    </section>
  );
}
// This component displays the details of the selected contact and allows toggling its favorite status.