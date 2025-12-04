import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ContactsPage from "@/pages/ContactsPage";
import ContactDetailPage from "@/pages/ContactDetailPage";
import Header from "@/components/Header";

export default function App() {
  return (
    <div className="bg-linear-to-b from-sky-100 to-sky-200 h-screen">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contact/:id" element={<ContactDetailPage />} />
        </Routes>
      </Router>
    </div>

  );
}
