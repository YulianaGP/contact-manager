// Componente que muestra pantalla de carga
const SplashScreen = ({ isLoading, error }) => {
  if (!isLoading) return null;

  return (
    <>
      {error ? (
        <div style={{ padding: "1rem", color: "red", background: "#fee" }}>
          <p>❌ {error}</p>
          <p>Verifica tu conexión e intenta nuevamente</p>
        </div>
      ) : (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <h2>📇 Iniciando Contact Manager...</h2>
        </div>
      )}
    </>
  );
};

export default SplashScreen;
