//  ContactCard.jsx
import "../ContactCard.css"; // 👈 Importa el CSS

export default function ContactCard({ contact, onToggleFavorite }) {
  // Si no hay contacto seleccionado, mostramos un mensaje
  if (!contact) {
    return (
      <div className="contact-card">
        <h3>Contacto Destacado</h3>
        <p>👆 Selecciona un contacto</p>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <h3>Contacto Destacado</h3>
      <h4>
        {contact.name} {contact.isFavorite ? "⭐" : ""}
      </h4>

      <p>📱 {contact.phone}</p>
      <p>✉️ {contact.email}</p>

      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.isFavorite ? "Quitar favorito" : "Agregar favorito"}
      </button>

      
    </div>
  );
}
