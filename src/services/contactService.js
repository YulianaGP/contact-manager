// src/services/contactService.js
const API_URL = import.meta.env.VITE_API_URL || "https://entermocks.vercel.app/api/contacts";

export class ContactService {
  static fetchCount = 0;
  static lastFetchTime = null;

  // 📌 GET — Obtener todos los contactos
  // Este método hace una solicitud GET a la API para traer todos los contactos.
  static async fetchContacts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar contactos");
      }

      const data = await response.json();

      ContactService.fetchCount += 1;
      ContactService.lastFetchTime = new Date();

      return data;
    } catch (error) {
      console.error("Fallo al cargar contactos:", error);
      throw error;
    }
  }

  // 📌 POST — Crear un nuevo contacto
  // Recibe un objeto con la información del contacto y lo envía a la API.
  static async createContact(newContact) {
    try {
      console.log("📤 Enviando a la API:", newContact); // 👈 DEBUG
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact), // Convertimos el objeto a JSON para enviarlo
      });

      console.log("📥 Respuesta cruda de la API:", response); // 👈 DEBUG
      
      if (!response.ok) {
        const errorText = await response.text(); // 👈 leer error real
        console.error("❌ Respuesta de error:", errorText); // 👈 DEBUG
        throw new Error("Error al crear contacto");
      }

      return await response.json(); // Retorna el contacto creado (incluye el id que asigna la API)
    } catch (error) {
      console.error("Fallo al crear contacto:", error);
      throw error;
    }
  }

  // 📌 PUT — Actualizar un contacto existente
  // Recibe el id del contacto y un objeto con los datos actualizados.
  static async updateContact(id, updatedData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar contacto");
      }

      return await response.json(); // Retorna el contacto actualizado
    } catch (error) {
      console.error("Fallo al actualizar contacto:", error);
      throw error;
    }
  }

  // 📌 DELETE — Eliminar un contacto
  // Recibe el id del contacto que queremos eliminar.
  static async deleteContact(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar contacto");
      }

      return { message: "Contacto eliminado con éxito" }; // Podemos retornar un mensaje de confirmación
    } catch (error) {
      console.error("Fallo al eliminar contacto:", error);
      throw error;
    }
  }

  // 🔍 Búsqueda en memoria — filtra contactos después de obtenerlos
  static async searchContacts(query) {
    try {
      const allContacts = await ContactService.fetchContacts();
      return allContacts.filter((contact) =>
        contact.fullname.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      throw error;
    }
  }
}

// Traer un contacto por ID
export async function fetchContactById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Contacto no encontrado");
  }
  return await response.json();
}

