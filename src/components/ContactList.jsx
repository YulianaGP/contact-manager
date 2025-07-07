import ContactCard from "./ContactCard";

export default function ContactList() {
  const contacts = [
    { id: 1, name: "Juan Pérez",   phone: "555‑6789", email: "juan@example.com" },
    { id: 2, name: "Ana Torres",   phone: "555‑9876", email: "ana@example.com" },
    { id: 3, name: "Pedro Zapata",   phone: "555‑5432", email: "pedro@example.com" }
  ];

  return (
    <section>
      {contacts.map(({ id, ...info }) => (
        <ContactCard key={id} {...info} />
      ))}
    </section>
  );
}
