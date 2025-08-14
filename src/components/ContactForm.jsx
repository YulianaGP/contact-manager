// ContactForm.jsx
import { useState, useRef } from "react";
import "../ContactForm.css";
import { ContactService } from "../services/contactService"; // 👈 Importar Service Layer

export default function ContactForm({ onAddContact }) {
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [advertenciaNombre, setAdvertenciaNombre] = useState("");

  const phoneInputRef = useRef();
  
  

  const handleChangeFullname = (event) => {
    setFullname(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhonenumber(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  function validateForm() {
    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "El nombre es requerido";
    }

    if (!phonenumber.trim()) {
      newErrors.phonenumber = "El teléfono es requerido";
    } else if (!/^[\d\s\-\(\)]+$/.test(phonenumber)) {
      newErrors.phonenumber = "Formato inválido. Ejemplo: (123) 456-7890";
    }
    
    if (!email.trim()) {
      newErrors.email = "El email es requerido";
    }

    return newErrors;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({}); // limpiar errores si todo está bien

    // 🔹 Mapeo de campos del front-end a los que espera la API
    const contactToSend = {
      fullname: fullname,
      phonenumber: phonenumber,
      email: email,
      type: "personal", // o el valor que quieras
    };

    try {
      // ✅ Guardar en la API usando tu Service Layer
      const savedContact = await ContactService.createContact(contactToSend);

      // ✅ Notificar al padre con lo que devolvió la API
      onAddContact(savedContact);

      // ✅ Limpiar campos
      setFullname("");
      setPhonenumber("");
      setEmail("");
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      alert("Hubo un problema al guardar el contacto.");
    }
  };


   // ✅ Calcular campos completados
  const camposCompletados = [fullname, phonenumber, email].filter(Boolean).length;

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p>Campos completados: {camposCompletados}/3</p>

      <label htmlFor="nuevo-contacto">Nombre:</label>
      <input
        id="nuevo-contacto"
        type="text"
        value={fullname}
        onChange={handleChangeFullname}
        placeholder="Nombre del contacto"
        autoComplete="name"
        style={{
          border: errors.fullname ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px",
          marginBottom: "4px",
        }}
      />
      {errors.fullname && <div style={{ color: "red", marginBottom: "4px" }}>{errors.fullname}</div>}
      {advertenciaNombre && <div style={{ color: "#e69500", marginBottom: "4px" }}>{advertenciaNombre}</div>}

      <label htmlFor="telefono">Teléfono:</label>
      <input
        id="telefono"
        type="tel"
        ref={phoneInputRef}
        value={phonenumber}
        onChange={handleChangePhone}
        placeholder="Número de teléfono"
        autoComplete="tel"
        style={{
          border: errors.phonenumber ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px",
          marginBottom: "4px",
        }}
      />
      {errors.phonenumber && <div style={{ color: "red", marginBottom: "4px" }}>{errors.phonenumber}</div>}

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
          const hayDatos = fullname || phonenumber || email;
          if (!hayDatos || confirm("¿Estás segura de que quieres limpiar el formulario?")) {
            setFullname("");
            setPhonenumber("");
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
