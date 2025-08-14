import { useState, useEffect } from "react";

export default function EditContactModal({ contact, onClose, onSave }) {
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (contact) {
      setFullname(contact.fullname || "");
      setPhonenumber(contact.phonenumber || "");
      setEmail(contact.email || "");
    }
  }, [contact]);

  function handleSubmit(e) {
    e.preventDefault();
    // Envía los datos actualizados
    onSave({ ...contact, fullname, phonenumber, email });
  }

  if (!contact) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Contacto</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />

          <label>Teléfono:</label>
          <input
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="submit">💾 Guardar cambios</button>
            <button type="button" onClick={onClose}>
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
