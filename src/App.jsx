// Clase 2: PASO 1 - Importamos el hook de React (useState)
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Panel.css";
import GestionContactos from "./components/GestionContactos";
import InformacionContacto from "./components/InformacionContacto";
import ContactForm from "./components/ContactForm";
import "./theme.css"; // Importamos el CSS del tema

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
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("az"); // valores: az, za, favoritos, recientes
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark"; // true si estaba en oscuro
  });
    useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // 🔍 Función para limpiar caracteres del teléfono
  const normalizarTelefono = (t) => t.replace(/[\s()-]/g, "").toLowerCase();

  /* ---------- DERIVADOS ---------- */
  const contactsFiltrados = contacts.filter((c) => {
    const q = busqueda.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      normalizarTelefono(c.phone).includes(normalizarTelefono(busqueda))
    );
  });

  let orderedContacts = [...contactsFiltrados];

  if (orden === "az") {
    orderedContacts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (orden === "za") {
    orderedContacts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (orden === "favoritos") {
    orderedContacts.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
  } else if (orden === "recientes") {
    orderedContacts.sort((a, b) => b.id - a.id); // más recientes primero
  }

const contactsToShow = showOnlyFavorites
  ? orderedContacts.filter((c) => c.isFavorite)
  : orderedContacts;


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
    // ✅ Validar que el nombre no esté vacío o en blanco
    if (!newContact.name.trim()) {
      setMensajeNotificacion("❌ El nombre no puede estar vacío");
      setTimeout(() => setMensajeNotificacion(null), 3000);
      return;
    }

    // ✅ Validar email y teléfono con expresiones regulares
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s()+-]+$/;

    if (!emailRegex.test(newContact.email)) {
      setMensajeNotificacion("❌ Email inválido");
      setTimeout(() => setMensajeNotificacion(null), 3000);
      return;
    }

    if (!phoneRegex.test(newContact.phone)) {
      setMensajeNotificacion("❌ Teléfono inválido");
      setTimeout(() => setMensajeNotificacion(null), 3000);
      return;
    }

    // ✅ Validar duplicados (por nombre, sin importar mayúsculas)
    const existe = contacts.some(
      (c) => c.name.toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (existe) {
      setMensajeNotificacion(`❌ El contacto "${newContact.name}" ya existe`);
      setTimeout(() => setMensajeNotificacion(null), 3000);
      return;
    }

    // ✅ Crear nuevo contacto y ordenar
    const nuevoId = contacts.length + 1;

    const updatedContacts = [
      ...contacts,
      {
        ...newContact,
        id: nuevoId,
        isFavorite: false,
      },
    ].sort((a, b) => a.name.localeCompare(b.name));

    setContacts(updatedContacts);
    setSelectedId(nuevoId);
    setMensajeNotificacion(`✅ ${newContact.name} agregado a tus contactos`);
    setTimeout(() => setMensajeNotificacion(null), 3000);
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

  function handleDeleteContact(id) {
    const eliminado = contacts.find((c) => c.id === id);
    if (!eliminado) return;

    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelectedId(null);

    setMensajeNotificacion(`🗑️ Eliminaste a ${eliminado.name}`);
    setTimeout(() => setMensajeNotificacion(null), 3000);
  }


  return (
    <div style={{ fontFamily: "Verdana" }}>
      <Header totalContacts={contacts.length} totalFavoritos={totalFavoritos} />
      
      <div style={{ textAlign: "right", padding: "1rem" }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Cambiar a modo {darkMode ? "claro" : "oscuro"}
        </button>
      </div>

      <main>
        {mensajeNotificacion && (
          <div className="notificacion" style={{ 
            color:
              mensajeNotificacion.startsWith("✅")
                ? "green"
                : mensajeNotificacion.startsWith("❌")
                ? "red"
                : "#e69500",
            fontWeight: "bold", 
            marginBottom: "1rem" }}>
            {mensajeNotificacion}
          </div>
        )}

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
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        orden={orden}
        setOrden={setOrden}
      />

      <InformacionContacto
        selectedContact={selectedContact}
        toggleFavorite={toggleFavorite}
        onClearContact={handleClearContact}
        onNextContact={handleNextContact}
        onDeleteContact={handleDeleteContact}
      />

      <Footer />
    </div>
  );
}