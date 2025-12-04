import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ContactsPage from "@/pages/ContactsPage";
import ContactDetailPage from "@/pages/ContactDetailPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App() {

  const [quantityContacts, setQuantityContacts] = useState(0);
  const [quantityFavorites, setQuantityFavorites] = useState(0);

  return (
    <div className="bg-linear-to-b from-sky-100 to-sky-200 h-screen">
      <Header totalContacts={quantityContacts} totalFavoritos={quantityFavorites} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage setQuantityContacts={setQuantityContacts} setQuantityFavorites={setQuantityFavorites} />} />
          <Route path="/contact/:id" element={<ContactDetailPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>

  );
}
