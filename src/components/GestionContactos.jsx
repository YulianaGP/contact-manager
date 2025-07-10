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

      <ContactList
        contacts={contactsToShow}
        selectedId={selectedId}
        onSelectContact={selectContact}
      />
    </section>
  );
}
