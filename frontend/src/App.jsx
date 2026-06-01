import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Beranda from "./pages/Beranda";
import Klasifikasi from "./pages/Klasifikasi";
import Kategori from "./pages/Kategori";
import Edukasi from "./pages/Edukasi"; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
        <Navbar />
        
        {/* flex-grow bikin konten utama menuhin layar, otomatis neken footer ke bawah */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/klasifikasi" element={<Klasifikasi />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/edukasi" element={<Edukasi />} />
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;