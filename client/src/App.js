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
import { PrivateRoute } from "./auth/PrivateRoute";
import { Pin2 } from "./pages/PinPage/Pin2";
import { Pin } from "./pages/PinPage/Pin";
import { RehabPage } from "./pages/RehabPage/RehabPage";

// import io from 'socket.io-client';
// import { useState, useEffect } from "react";

// const connectSocket = () =>{
//     const socket = io('http://localhost:5000', { transports: ["websocket"] })
//     return socket;
// }



function App() {
  // const [ socket ] = useState( connectSocket() );
  
  // useEffect(() => {
  //   socket.on('status-device', (device) =>{
  //     console.log(device);
  //   })
  // }, [socket])
  

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

      <Route path="/rehabilitate" element={
        <PrivateRoute>
          <RehabPage />
        </PrivateRoute>
        
      } />

      <Route path="/app" element={
        <PrivateRoute>
          <Pin />
        </PrivateRoute>
        
      } />


    </Routes>
  );
}

export default App;
