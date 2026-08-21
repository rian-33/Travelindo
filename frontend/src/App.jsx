import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailDestination from "./pages/DetailDestination";
import Destinations from "./pages/Destinitations";
import Hotels from "./pages/Hotels";
import Promo from "./pages/Promo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Culinary from "./pages/Culinary";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:id" element={<DetailDestination />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* KODE BARU 2: Mendaftarkan "Alamat" agar dikenali oleh React */}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/culinary" element={<Culinary />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/promo" element={<Promo />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
