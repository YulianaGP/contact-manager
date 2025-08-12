import { useState, useEffect } from "react";
import { initializeApp } from './utils/initializer';
import SplashScreen from './components/SplashScreen';
import { ContactService } from "./services/contactService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Panel.css";
import GestionContactos from "./components/GestionContactos";
import InformacionContacto from "./components/InformacionContacto";

import ContactForm from "./components/ContactForm";
import "./theme.css"; // Importamos el CSS del tema

export default function App() {

  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("az"); // valores: az, za, favoritos, recientes
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0); 
  const [lastFetchTime, setLastFetchTime] = useState(null);
  
  // Modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark"; // true si estaba en oscuro
  });

    useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  async function fetchContactsDirectly() {
    setIsLoading(true);
    setError(null);

    try {
      const data = await ContactService.fetchContacts();
      setContacts(data);
      setMensajeNotificacion("✅ Contactos cargados desde la API");
      setFetchCount((prev) => prev + 1);
      setLastFetchTime(new Date().toLocaleString());
    } catch (err) {
      setError(err.message || "Error al cargar contactos");
      setMensajeNotificacion("❌ No se pudieron cargar los contactos");
    } finally {
      setIsLoading(false);
    }
  }




  // 🔍 Función para limpiar caracteres del teléfono
  const normalizarTelefono = (t) => t.replace(/[\s()-]/g, "").toLowerCase();

  /* ---------- DERIVADOS ---------- */
  const contactsFiltrados = contacts.filter((c) => {
    const q = busqueda.toLowerCase();
    const nombre = c.fullname?.toLowerCase() || "";
    const telefono = normalizarTelefono(c.phonenumber || "");
    return (
      nombre.includes(q) ||
      telefono.includes(normalizarTelefono(busqueda))
    );
  });




  let orderedContacts = [...contactsFiltrados];

  if (orden === "az") {
    orderedContacts.sort((a, b) => (a.fullname ?? "").localeCompare(b.fullname ?? ""));
  } else if (orden === "za") {
    orderedContacts.sort((a, b) => (b.fullname ?? "").localeCompare(a.fullname ?? ""));
  } else if (orden === "favoritos") {
    orderedContacts.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
  } else if (orden === "recientes") {
    orderedContacts.sort((a, b) => b.id - a.id); // más recientes primero
  }


const contactsToShow = showOnlyFavorites
  ? orderedContacts.filter((c) => c.isFavorite)
  : orderedContacts;


  const selectedContact = contacts.find((c) => String(c.id) === String(selectedId));


  const totalFavoritos = contacts.filter(c => c.isFavorite).length;

  // Mostrar mensaje si no hay favoritos y el filtro está activado
  useEffect(() => {
    if (showOnlyFavorites && totalFavoritos === 0) {
      setMensajeNotificacion("⚠️ No hay contactos favoritos");
    }
  }, [contacts, showOnlyFavorites]);

  // 👇 Para inicializar la app (nuevo)
  useEffect(() => {
    async function startApp() {
      try {
        const result = await initializeApp(3000); // 3 segundos
        setIsInitializing(result);
      } catch (err) {
        setInitError("Error al inicializar");
      }
    }

    startApp();
  }, []);

  /* ---------- HANDLERS ---------- */
  function handleAddContact(newContact) {
    // ✅ Validar que el nombre no esté vacío o en blanco
    if (!newContact.fullname.trim()) {
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

    if (!phoneRegex.test(newContact.phonenumber)) {
      setMensajeNotificacion("❌ Teléfono inválido");
      setTimeout(() => setMensajeNotificacion(null), 3000);
      return;
    }

    // ✅ Validar duplicados (por nombre, sin importar mayúsculas)
    const existe = contacts.some(
      (c) => c.fullname.toLowerCase() === newContact.fullname.trim().toLowerCase()
    );

    if (existe) {
      setMensajeNotificacion(`❌ El contacto "${newContact.fullname}" ya existe`);
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
    ].sort((a, b) => a.fullname.localeCompare(b.fullname));

    setContacts(updatedContacts);
    setSelectedId(nuevoId);
    setMensajeNotificacion(`✅ ${newContact.fullname} agregado a tus contactos`);
    setTimeout(() => setMensajeNotificacion(null), 3000);
  }

  function selectContact(id) {
  const selected = contacts.find((c) => c.id === id);
  console.log("Contacto seleccionado:", selected); // 👈
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

    setMensajeNotificacion(`🗑️ Eliminaste a ${eliminado.fullname}`);
    setTimeout(() => setMensajeNotificacion(null), 3000);
  }


  if (isInitializing) {
  return <SplashScreen isLoading={isInitializing} error={initError} />;
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
        <div
          className="notificacion"
          style={{
            color: mensajeNotificacion.startsWith("✅")
              ? "green"
              : mensajeNotificacion.startsWith("❌")
              ? "red"
              : "#e69500",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {mensajeNotificacion}
        </div>
      )}
      
      {!isLoading && !contacts.length && (
        <button onClick={fetchContactsDirectly}>📡 Cargar Contactos</button>
      )}
      
      {isLoading && (
        <div style={{ color: "blue" }}>
          ⏳ Cargando contactos desde la API...
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          ❌ {error}
          <br />
          <button onClick={fetchContactsDirectly}>🔄 Reintentar</button>
        </div>
      )}

      {contacts.length === 0 && !isLoading && !error && (
        <div>No hay contactos cargados. Haz clic en "📡 Cargar Contactos".</div>
      )}

      
      {fetchCount > 0 && (
        <p>🔁 Fetch realizado {fetchCount} veces.</p>
      )}

      {lastFetchTime && (
        <p>📅 Última carga: {lastFetchTime}</p>
      )}

      <ContactForm onAddContact={handleAddContact} />
    </main>

    <GestionContactos
      contacts={contacts}
      isLoading={isLoading}
      error={error}
      fetchContacts={fetchContactsDirectly} 
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