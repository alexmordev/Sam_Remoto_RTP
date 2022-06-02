import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./pages/HomePage/Home";
import { Login } from "./pages/LoginPage/Login";
import { Gestion } from "./pages/GestionPage/Gestion";
import { Dumps } from "./pages/DumpsPage/Dumps";
import { SamCounter } from "./pages/SamCounters/SamCounter";



function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exacthpath="/" element={<Login />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/dumps" element={<Dumps />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/samcounters" element={<SamCounter />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
