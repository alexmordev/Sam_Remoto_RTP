// Importaciones de estilos
import "./App.css";

// Importaciones de prime
import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

// Importaciones de components y pages
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/HomePage/Home";
import { Login } from "./pages/LoginPage/Login";
import { SamCounter } from "./pages/SamCounters/SamCounter";
import { Pin } from "./pages/PinPage/Pin";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Pin2 } from "./pages/PinPage/Pin2";
import { VistaPrueba } from "./pages/VistaPrueba";


function App() {
  return (
    <Routes>  //Route 1
      <Route path="/" element={<Login />} />

      <Route path="/homepage" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />

      <Route path="/samcounters" element={
        <PrivateRoute>

          <SamCounter />
        </PrivateRoute>
        
      } />

      <Route path="/app" element={
        <PrivateRoute>
          <Pin2/>
        </PrivateRoute>
        
      } />

      <Route path="/prueba" element={
          <VistaPrueba/>
        
      } />

    </Routes>
  );
}

export default App;
