// Clase 2: PASO 1 - Importamos el hook de React (useState)
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Panel.css"; //  💡  ruta relativa a src/
import GestionContactos from "./components/GestionContactos";
import InformacionContacto from "./components/InformacionContacto";

export default function App() {
  /* ---------- STATE PRINCIPAL ---------- */
  const [contacts, setContacts] = useState([
    { id: 1, name: "Juan Pérez", phone: "555‑6789", email: "juan@example.com", isFavorite: true },
    { id: 2, name: "Ana Torres", phone: "555‑9876", email: "ana@example.com", isFavorite: false },
    { id: 3, name: "Pedro Zapata", phone: "555‑5432", email: "pedro@example.com", isFavorite: true },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [nameContact, setNameContact] = useState("");

  /* ---------- DERIVADOS ---------- */
  const contactsToShow = showOnlyFavorites
    ? contacts.filter((c) => c.isFavorite)
    : contacts;

  const selectedContact = contacts.find((c) => c.id === selectedId);

  /* ---------- HANDLERS ---------- */
  function selectContact(id) {
    const selected = contacts.find((c) => c.id === id);
    if (selected) {
      alert(`Seleccionaste: ${selected.name}`);
    }
    setSelectedId(id);
  }

  function handleClearContact() {
    setSelectedId(null);
  }

  function toggleFavorite(id) {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  }

  function toggleFilter() {
    setShowOnlyFavorites((prev) => !prev);
  }

  function markAllAsFavorites() {
    setContacts((prev) => prev.map((c) => ({ ...c, isFavorite: true })));
  }

  function resetFavorites() {
    setContacts((prev) => prev.map((c) => ({ ...c, isFavorite: false })));
  }

  const handleChangeContact = (event) => {
    setNameContact(event.target.value);
  };

  function PhoneInput() {
    const [telefono, setTelefono] = useState("");

    const handleChangePhone = (event) => {
      setTelefono(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      if (!nameContact || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      setContacts((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: nameContact,
          phone: telefono,
          email: "nuevo@email.com",
          isFavorite: false,
        },
      ]);

      setNameContact("");
      setTelefono("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nameContact}
          onChange={handleChangeContact}
          placeholder="Nombre del contacto"
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          value={telefono}
          onChange={handleChangePhone}
          placeholder="Número de teléfono"
        />

        <button type="submit">Agregar Contacto</button>
      </form>
    );
  }

  /* ---------- RENDER ---------- */
  return (
    <div style={{ fontFamily: "Verdana" }}>
      <Header />

      <main>
        <PhoneInput />
      </main>

      <GestionContactos
        contacts={contacts}
        contactsToShow={contactsToShow}
        showOnlyFavorites={showOnlyFavorites}
        toggleFilter={toggleFilter}
        markAllAsFavorites={markAllAsFavorites}
        resetFavorites={resetFavorites}
        selectedId={selectedId}
        selectContact={selectContact}
      />

      <InformacionContacto
        selectedContact={selectedContact}
        toggleFavorite={toggleFavorite}
        onClearContact={handleClearContact}
      />

      <Footer />
    </div>
  );
}
