export function Filters({handleChangeFavorite}) {
  return (
    <section
      style={{
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <label htmlFor="">
        <h3>Filtros</h3>
        <input type="checkbox" onChange={handleChangeFavorite} />
        Mostrar Favoritos
      </label>
    </section>
  );
}