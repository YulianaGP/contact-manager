//  ContactCard.jsx
import "../ContactCard.css"; // 👈 Importa el CSS

export default function ContactCard({ contact, onToggleFavorite }) {
  if (!contact) return <p>No hay contacto seleccionado</p>;

  return (
    <div className="contact-card">
      <h3>
        {contact.name}{" "}
        <span style={{ fontSize: 22 }}>
          {contact.isFavorite ? "⭐" : "☆"}
        </span>
      </h3>

      <p>📱 {contact.phone}</p>
      <p>✉️ {contact.email}</p>

      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.isFavorite ? "Quitar favorito" : "Agregar favorito"}
      </button>
    </div>
  );
}
