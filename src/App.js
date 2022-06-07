// Importaciones de estilos
import "./App.css";

// Importaciones de prime
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

// Importaciones de components y pages
import { Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./pages/HomePage/Home";
import { Login } from "./pages/LoginPage/Login";
import { Dumps } from "./pages/DumpsPage/Dumps";
import { SamCounter } from "./pages/SamCounters/SamCounter";
import {Pin} from "./pages/PinPage/Pin";
import { VistaPrueba } from "./pages/VistaPrueba";



function App() {
  return (
    // <div className="h-full w-full  flex align-content-center justify-content-center">
    //   <div className="absolute h-full w-full  flex align-content-center justify-content-center">
   
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/dumps" element={<Dumps />} />
          <Route path="/samcounters" element={<SamCounter />} />
          <Route path="/app" element={<Pin/>} />
          <Route path="/prueba" element={<VistaPrueba />} />
        </Routes>
    //   </div>
    // </div>
  );
}

export default App;
