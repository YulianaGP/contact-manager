// Clase 2: PASO 1 - Importamos el hook de React (useState)
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Panel.css";
import GestionContactos from "./components/GestionContactos";
import InformacionContacto from "./components/InformacionContacto";
import ContactForm from "./components/ContactForm";

export default function App() {
  /* ---------- STATE PRINCIPAL ---------- */
  const [contacts, setContacts] = useState([
    { id: 1, name: "Juan Pérez", phone: "555‑6789", email: "juan@example.com", isFavorite: true },
    { id: 2, name: "Ana Torres", phone: "555‑9876", email: "ana@example.com", isFavorite: false },
    { id: 3, name: "Pedro Zapata", phone: "555‑5432", email: "pedro@example.com", isFavorite: true },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  /* ---------- DERIVADOS ---------- */
  const contactsToShow = showOnlyFavorites
    ? contacts.filter((c) => c.isFavorite)
    : contacts;

  const selectedContact = contacts.find((c) => c.id === selectedId);

  const totalFavoritos = contacts.filter(c => c.isFavorite).length;

  // Mostrar mensaje si no hay favoritos y el filtro está activado
  useEffect(() => {
    if (showOnlyFavorites && totalFavoritos === 0) {
      setMensajeNotificacion("⚠️ No hay contactos favoritos");
    }
  }, [contacts, showOnlyFavorites]);



  /* ---------- HANDLERS ---------- */
  function handleAddContact(newContact) {
  // Comprobar duplicados (por nombre, sin importar mayúsculas)
  const existe = contacts.some(
    (c) => c.name.toLowerCase() === newContact.name.trim().toLowerCase()
  );

  if (existe) {
    // Mostrar mensaje de error y detener
    setMensajeNotificacion(`❌ El contacto "${newContact.name}" ya existe`);
    setTimeout(() => setMensajeNotificacion(null), 3000);
    return;
  }
  
  const nuevoId = contacts.length + 1;

  const updatedContacts = [
    ...contacts,
    {
      ...newContact,
      id: nuevoId,
      isFavorite: false,
    },
  ];

  setContacts(updatedContacts);

  // ✅ Seleccionamos automáticamente el nuevo contacto
  setSelectedId(nuevoId);

  // ✅ Mostramos notificación
  setMensajeNotificacion(`✅ ${newContact.name} agregado a tus contactos`);

  // ⏳ Ocultamos la notificación después de 3 segundos
  setTimeout(() => {
    setMensajeNotificacion(null);
  }, 3000);
}

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

  function handleNextContact() {
    if (!contacts.length) return;

    const currentIndex = contacts.findIndex((c) => c.id === selectedId);
    const nextIndex = (currentIndex + 1) % contacts.length;
    const nextContact = contacts[nextIndex];
    setSelectedId(nextContact.id);
  }


  return (
    <div style={{ fontFamily: "Verdana" }}>
      <Header totalFavoritos={totalFavoritos} />

      <main>
        {mensajeNotificacion && (
          <div className="notificacion" style={{ 
            color:
              mensajeNotificacion.startsWith("✅")
                ? "green"
                : mensajeNotificacion.startsWith("❌")
                ? "red"
                : "#e69500", // naranja para advertencias
            fontWeight: "bold", 
            marginBottom: "1rem" }}>
            {mensajeNotificacion}
          </div>
        )}

        {/* ✅ Enviamos el nuevo handler como prop */}
        <ContactForm onAddContact={handleAddContact} />
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
        onNextContact={handleNextContact}
      />

      <Footer />
    </div>
  );
}

