// Importaciones de estilos
import "./App.css";

// Importaciones de prime
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

// Importaciones de components y pages
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./pages/HomePage/Home";
import { Login } from "./pages/LoginPage/Login";
import { Gestion } from "./pages/GestionPage/Gestion";
import { Dumps } from "./pages/DumpsPage/Dumps";
import { SamCounter } from "./pages/SamCounters/SamCounter";
import {Pin} from "./pages/PinPage/Pin";



function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/dumps" element={<Dumps />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/samcounters" element={<SamCounter />} />
        <Route path="/pin" element={<Pin/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
