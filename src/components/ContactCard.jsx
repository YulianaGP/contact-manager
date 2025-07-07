// ContactCard.jsx
import "../ContactCard.css"; // 👈 Importa el CSS

export default function ContactCard({ name, phone, email }) {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p>📱 Teléfono: {phone}</p>
      <p>✉️ Email: {email}</p>
    </div>
  );
}
