import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailDestination from "./pages/DetailDestination";
import Destinations from "./pages/Destinitations";
import Hotels from "./pages/Hotels";
import Promo from "./pages/Promo";

const Login = () => (
  <div className="text-center py-20 text-3xl font-serif text-blue-600 font-bold">
    Halaman Login Segera Hadir!
  </div>
);
const Register = () => (
  <div className="text-center py-20 text-3xl font-serif text-blue-600 font-bold">
    Halaman Daftar Segera Hadir!
  </div>
);

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
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/promo" element={<Promo />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
