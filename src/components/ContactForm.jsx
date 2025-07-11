import { useState } from "react";

export default function ContactForm({ onAddContact }) {
  const [nameContact, setNameContact] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeContact = (event) => {
    setNameContact(event.target.value);
  };

  const handleChangePhone = (event) => {
    setTelefono(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nameContact || !telefono || !email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newContact = {
      name: nameContact,
      phone: telefono,
      email: email,
    };

    onAddContact(newContact);

    // Limpiar campos
    setNameContact("");
    setTelefono("");
    setEmail("");
  };

   // ✅ Calcular campos completados
  const camposCompletados = [nameContact, telefono, email].filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit}>
      <p>Campos completados: {camposCompletados}/3</p>
      
      <label htmlFor="nuevo-contacto">Nombre:</label>
      <input
        id="nuevo-contacto"
        type="text"
        value={nameContact}
        onChange={handleChangeContact}
        placeholder="Nombre del contacto"
        autoComplete="name"
      />

      <label htmlFor="telefono">Teléfono:</label>
      <input
        id="telefono"
        type="tel"
        value={telefono}
        onChange={handleChangePhone}
        placeholder="Número de teléfono"
        autoComplete="tel"
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Correo electrónico"
        autoComplete="email"
      />

      <button type="submit">Agregar Contacto</button>
    </form>
  );
}
