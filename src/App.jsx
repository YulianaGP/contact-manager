// Clase 2: PASO 1 - Importamos el hook de React (useState)
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactList from "./components/ContactList";
import ContactCard from "./components/ContactCard";
import "./Panel.css";   //  💡  ruta relativa a src/

export default function App() {
  /* ---------- STATE PRINCIPAL ---------- */
  const [contacts, setContacts] = useState([
    { id: 1, name: "Juan Pérez",  phone: "555‑6789", email: "juan@example.com",  isFavorite: true },
    { id: 2, name: "Ana Torres",  phone: "555‑9876", email: "ana@example.com",   isFavorite: false },
    { id: 3, name: "Pedro Zapata", phone: "555‑5432", email: "pedro@example.com", isFavorite: true },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  /* ---------- DERIVADOS ---------- */
  const contactsToShow = showOnlyFavorites
    ? contacts.filter((c) => c.isFavorite)
    : contacts;

  const selectedContact =
    contacts.find((c) => c.id === selectedId) || contactsToShow[0];

  /* ---------- HANDLERS ---------- */
  function selectContact(id) {
    setSelectedId(id);
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

  /* ---------- UI ---------- */
  return (
    <div style={{ fontFamily: "Verdana" }}>
      <Header />

      {/* ------- Panel de control ------- */}
      <section className="control-panel">
        <h3>
          Contactos visibles: {contactsToShow.length} de {contacts.length}
        </h3>

        <button onClick={toggleFilter}>
          {showOnlyFavorites ? "Mostrar Todos" : "Solo Favoritos"}
        </button>
        <button onClick={markAllAsFavorites} style={{ marginLeft: 8 }}>
          Marcar todos como favoritos
        </button>
        <button onClick={resetFavorites} style={{ marginLeft: 8 }}>
          Resetear favoritos
        </button>

        <ContactList
          contacts={contactsToShow}
          selectedId={selectedId}
          onSelectContact={selectContact}
        />
      </section>

      {/* ------- Detalle ------- */}
      <section className="contact-detail">
        <h2>Contacto Actual</h2>
        <ContactCard
          contact={selectedContact}
          onToggleFavorite={toggleFavorite}
        />
      </section>

      <Footer />
    </div>
  );
}
