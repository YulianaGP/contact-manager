// ContactForm.jsx
import { useState, useRef } from "react";
import "../ContactForm.css";

export default function ContactForm({ onAddContact }) {
  const [nameContact, setNameContact] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [advertenciaNombre, setAdvertenciaNombre] = useState("");

  const phoneInputRef = useRef();
  
  

  const handleChangeContact = (event) => {
    setNameContact(event.target.value);
  };

  const handleChangePhone = (event) => {
    setTelefono(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  function validateForm() {
    const newErrors = {};

    if (!nameContact.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!telefono.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^[\d\s\-\(\)]+$/.test(telefono)) {
      newErrors.phone = "Formato inválido. Ejemplo: (123) 456-7890";
    }
    
    if (!email.trim()) {
      newErrors.email = "El email es requerido";
    }

    return newErrors;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({}); // limpiar errores si todo está bien

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
    <form className="contact-form" onSubmit={handleSubmit}>
      <p>Campos completados: {camposCompletados}/3</p>

      <label htmlFor="nuevo-contacto">Nombre:</label>
      <input
        id="nuevo-contacto"
        type="text"
        value={nameContact}
        onChange={handleChangeContact}
        placeholder="Nombre del contacto"
        autoComplete="name"
        style={{
          border: errors.name ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px",
          marginBottom: "4px",
        }}
      />
      {errors.name && <div style={{ color: "red", marginBottom: "4px" }}>{errors.name}</div>}
      {advertenciaNombre && <div style={{ color: "#e69500", marginBottom: "4px" }}>{advertenciaNombre}</div>}

      <label htmlFor="telefono">Teléfono:</label>
      <input
        id="telefono"
        type="tel"
        ref={phoneInputRef}
        value={telefono}
        onChange={handleChangePhone}
        placeholder="Número de teléfono"
        autoComplete="tel"
        style={{
          border: errors.phone ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px",
          marginBottom: "4px",
        }}
      />
      {errors.phone && <div style={{ color: "red", marginBottom: "4px" }}>{errors.phone}</div>}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Correo electrónico"
        autoComplete="email"
        style={{
          border: errors.email ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px",
          marginBottom: "4px",
        }}
      />
      {errors.email && <div style={{ color: "red", marginBottom: "4px" }}>{errors.email}</div>}

      <button
        type="button"
        onClick={() => {
          const hayDatos = nameContact || telefono || email;
          if (!hayDatos || confirm("¿Estás segura de que quieres limpiar el formulario?")) {
            setNameContact("");
            setTelefono("");
            setEmail("");
            setErrors({});
            setAdvertenciaNombre("");
          }
        }}
        style={{ marginRight: 8 }}
      >
        Limpiar
      </button>

      <button type="submit">Agregar Contacto</button>
    </form>
  );
}
