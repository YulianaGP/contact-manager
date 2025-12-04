export default function ContactCard({ contact, onToggleFavorite, onDeleteContact }) {
  // Si no hay contacto seleccionado, mostramos un mensaje
  if (!contact) {
    return (
      <div className="contact-card">
        <h3>Contacto Destacado</h3>
        <p>👆 Selecciona un contacto</p>
      </div>
    );
  }

  function handleDelete() {
    const confirmado = confirm(`¿Estás segura de eliminar a ${contact.fullname}?`);
    if (confirmado) {
      onDeleteContact(contact.id);
    }
  }

   return (
    <div className="contact-card">
      <h3>Contacto Destacado</h3>
      <h4>
        {contact.fullname} {contact.isFavorite ? "⭐" : ""}
      </h4>

      <p>📱 {contact.phonenumber}</p>
      <p>✉️ {contact.email}</p>
      {contact.type && <p>📂 Tipo: {contact.type}</p>}
      {contact.company && <p>🏢 Empresa: {contact.company}</p>}
      {contact.birthday && <p>🎂 Cumpleaños: {contact.birthday}</p>}
      
      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.isFavorite ? "Quitar favorito" : "Agregar favorito"}
      </button>

      <button onClick={handleDelete} style={{ marginLeft: 8, color: "red" }}>
        🗑️ Eliminar
      </button>
    </div>
  );
}
