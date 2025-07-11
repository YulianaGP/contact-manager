export function ClearContact({ handleClearContact }) {
  return (
    <section
      style={{
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <button onClick={handleClearContact}>Limpiar</button>
    </section>
  );
}