import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactList from "./components/ContactList";

export default function App() {
  return (
    <div
    style={{
        fontFamily: "Verdana",
    }}>
        <Header/>
        <main>
            <ContactList/>
        </main>
        <Footer/>
    </div>
  )
}
