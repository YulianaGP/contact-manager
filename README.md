# Reflexión:

- ¿Qué diferencia hay entre pasar datos y pasar funciones como props?
- ¿Por qué el estado debe estar en App y no en ContactCard?
- ¿Cómo se ejecuta una función que recibimos como prop?

## Lo aprendido

Pasar **datos como props** permite enviar información (como nombre, email o si es favorito) de un componente padre a uno hijo para que lo muestre. Pasar **funciones como props** permite que el componente hijo pueda ejecutar acciones que modifican el estado del padre (por ejemplo, cambiar si un contacto es favorito). El **estado debe estar en App** porque es el componente que coordina y necesita compartir esa información entre varios componentes, como la lista de contactos y el contacto seleccionado. Una **función recibida como prop** se ejecuta simplemente llamándola: por ejemplo, `onToggleFavorite(id)` dentro del hijo cuando ocurre un evento.
