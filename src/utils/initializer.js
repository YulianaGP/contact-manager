// Promesa que simula la carga de la app
export function initializeApp(duration = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false); // después de 3 segundos finaliza
    }, duration);
  });
}

// Promesa que a veces falla (para practicar manejo de errores)
export const loadAppData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% de éxito
      if (success) {
        resolve(false);
      } else {
        reject(true);
      }
    }, 2000);
  });
};
