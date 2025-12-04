// src/pages/ContactsPage.jsx
import { useState, useEffect } from "react";
import { initializeApp } from '../utils/initializer';
import { ContactService } from "../services/contactService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GestionContactos from "../components/GestionContactos";
import InformacionContacto from "../components/InformacionContacto";
import EditContactModal from "../components/EditContactModal";
import ContactForm from "../components/ContactForm";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";


export default function ContactsPage() {

  // 🔹 Todos tus useState y useEffect (copiados tal como estaban en App.jsx):
  const navigate = useNavigate();   // 👈 al inicio del componente
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("az");
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

// 🔹 Inicializar contactos desde LocalStorage al cargar la página
    useEffect(() => {
        // Intentar cargar contactos desde LocalStorage al iniciar
        const saved = localStorage.getItem("contacts");
        if (saved) {
            setContacts(JSON.parse(saved));
        }
    }, []);   // 👈 arreglo vacío -> solo se ejecuta 1 vez cuando se monta el componente


  // Mismo código (handlers / useEffects / derivados) que ya tenías...
      useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

// 👇 Abre el modal y guarda el contacto a editar
function handleOpenEdit(contact) {
  setContactToEdit(contact);
  setIsEditModalOpen(true);
}

// 👇 Cierra el modal
function handleCloseEdit() {
  setIsEditModalOpen(false);
  setContactToEdit(null);
}

// 🔹 GUARDAR CONTACTOS EN LOCALSTORAGE
function handleSaveContacts() {
  try {
    const serialized = JSON.stringify(contacts);          // convertimos el array a texto
    localStorage.setItem("contacts", serialized);         // lo guardamos
    setMensajeNotificacion("✅ Contactos guardados en LocalStorage");
    setTimeout(() => setMensajeNotificacion(null), 3000);
  } catch (error) {
    console.error("Error al guardar contactos:", error);
  }
}

// 🔹 CARGAR CONTACTOS DESDE LOCALSTORAGE
function handleLoadContacts() {
  try {
    const saved = localStorage.getItem("contacts");      // obtenemos lo guardado
    if (saved) {
      const parsed = JSON.parse(saved);                  // texto ➝ array
      setContacts(parsed);                               // actualizamos el estado
      setMensajeNotificacion("✅ Contactos cargados desde LocalStorage");
    } else {
      setMensajeNotificacion("⚠️ No hay contactos guardados");
    }
    setTimeout(() => setMensajeNotificacion(null), 3000);
  } catch (error) {
    console.error("Error al cargar contactos:", error);
  }
}

async function handleSyncContacts() {
  try {
    // 1. Traer datos desde la API
    const dataFromAPI = await ContactService.fetchContacts();

    // 2. Actualizar en pantalla
    setContacts(dataFromAPI);

    // 3. Guardar también en LocalStorage
    localStorage.setItem("contacts", JSON.stringify(dataFromAPI));

    // 4. Notificación
    setMensajeNotificacion("✅ Sincronización exitosa");
    setTimeout(() => setMensajeNotificacion(null), 3000);

  } catch (error) {
    console.error("Error al sincronizar:", error);
    setMensajeNotificacion("❌ No se pudo sincronizar");
    setTimeout(() => setMensajeNotificacion(null), 3000);
  }
}


// 👇 Guarda los cambios del contacto editado
async function handleSaveEdit(updatedContact) {
  if (!updatedContact) return;

  try {
    // 🔁 Llamar al PUT en la API
    const updated = await ContactService.updateContact(updatedContact.id, updatedContact);

    // 🟢 Actualizar el estado local
    setContacts(prevContacts =>
      prevContacts.map(c =>
        c.id === updated.id ? updated : c
      )
    );

    // ✅ (nuevo) redirigir al detalle tras la edición
    navigate(`/contact/${updated.id}`, {
      state: { message: "¡Contacto actualizado!" }
    });

  } catch (err) {
    console.error("Error al actualizar contacto:", err);
    setMensajeNotificacion("❌ No se pudo actualizar el contacto");
    setTimeout(() => setMensajeNotificacion(null), 3000);
  } finally {
    setIsEditModalOpen(false);
    setContactToEdit(null);
  }
}


  async function handleUpdateContact(updatedContact) {
    try {
      const updated = await ContactService.updateContact(updatedContact.id, updatedContact);

      setContacts(prev =>
        prev.map(c => c.id === updated.id ? updated : c)
      );

      setMensajeNotificacion(`✅ ${updated.fullname} actualizado`);
      setTimeout(() => setMensajeNotificacion(null), 3000);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
      setMensajeNotificacion("❌ No se pudo actualizar el contacto");
      setTimeout(() => setMensajeNotificacion(null), 3000);
    }
  }


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
    console.log("Ejemplo de contacto desde la API:", contacts[0]);
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
          <div className="notificacion" style={{
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

        {!isLoading && !contacts.length && (
            <button onClick={fetchContactsDirectly}>📡 Cargar Contactos</button>
        )}
        <button onClick={handleSaveContacts}>💾 Guardar Contactos</button>
        <button onClick={handleLoadContacts}>📥 Cargar Contactos</button>
        <button onClick={handleSyncContacts}>🔄 Sincronizar Datos</button>



        {isLoading && <div style={{ color: "blue" }}>⏳ Cargando contactos desde la API...</div>}

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

        {fetchCount > 0 && <p>🔁 Fetch realizado {fetchCount} veces.</p>}
        {lastFetchTime && <p>📅 Última carga: {lastFetchTime}</p>}

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
        onEditContact={handleOpenEdit}
      />

      {isEditModalOpen && (
        <EditContactModal
          contact={contactToEdit}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}

      <Footer />
    </div>
  );
}
