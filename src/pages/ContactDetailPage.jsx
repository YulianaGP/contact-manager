import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { fetchContactById } from '../services/contactService';
import ContactCard from '../components/ContactCard';

export default function ContactDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContact() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchContactById(id);
        setContact(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadContact();
    }
  }, [id]);

  if (isLoading) return <p>⏳ Cargando contacto...</p>;
  if (error)     return <p>❌ {error}</p>;

  return (
    <div>
        {/* ✅ Mostrar mensaje si viene desde una navegación programática */}
        {location.state?.message && (
            <div style={{ color: "green", marginBottom: "1rem" }}>
                ✅ {location.state.message}
            </div>
        )}

        <ContactCard contact={contact} />   {/* 👈 reutilizamos tu componente */}
        <Link to="/contacts">← Volver a contactos</Link>
    </div>
  );
}
