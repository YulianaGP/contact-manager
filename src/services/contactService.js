// src/services/contactService.js

const API_URL = import.meta.env.VITE_API_URL || "https://entermocks.vercel.app/api/contacts";

export class ContactService {
  static fetchCount = 0;
  static lastFetchTime = null;

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