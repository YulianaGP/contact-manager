// GestionContactos.jsx
import ContactList from "./ContactList";

export default function GestionContactos({
  contacts,
  contactsToShow,
  showOnlyFavorites,
  toggleFilter,
  markAllAsFavorites,
  resetFavorites,
  selectedId,
  selectContact,
  busqueda,
  setBusqueda,
  orden,
  setOrden,
}) {
  return (
    <section className="control-panel">
      <h3>  Contactos visibles: {contactsToShow?.length ?? 0} de {contacts?.length ?? 0} </h3>
      <button onClick={toggleFilter}>
        {showOnlyFavorites ? "Mostrar Todos" : "Solo Favoritos"}
      </button>

      <button onClick={markAllAsFavorites} style={{ marginLeft: 8 }}>
        Marcar todos como favoritos
      </button>

      <button onClick={resetFavorites} style={{ marginLeft: 8 }}>
        Resetear favoritos
      </button>

      <input
        type="text"
        placeholder="Buscar por nombre o teléfono"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: "12px", padding: "6px", width: "100%" }}
      />

      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        style={{ marginBottom: "12px", padding: "6px", width: "100%" }}
      >
        <option value="az">Orden A-Z</option>
        <option value="za">Orden Z-A</option>
        <option value="favoritos">Favoritos primero</option>
        <option value="recientes">Recién agregados</option>
      </select>

      <ContactList
        contacts={contactsToShow}
        selectedId={selectedId}
        onSelectContact={selectContact}
        busqueda={busqueda}
      />
    </section>
  );
}
