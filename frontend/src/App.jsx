import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailDestination from "./pages/DetailDestination"; // Import halaman baru

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Ini adalah rute dinamis (/:id) */}
          <Route path="/destination/:id" element={<DetailDestination />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
