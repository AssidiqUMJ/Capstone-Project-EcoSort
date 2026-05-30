import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  // Ini trik biar garis bawah hijau (active state) ngikutin halaman yang lagi dibuka
  const location = useLocation();

  const getLinkClass = (path) => {
    const baseClass = "hover:text-emerald-800 pb-1 font-semibold transition-colors ";
    return location.pathname === path 
      ? baseClass + "text-emerald-800 border-b-2 border-emerald-800" 
      : baseClass + "text-gray-500";
  };

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100 shadow-sm">
      {/* Bagian Kiri: Logo */}
      <Link to="/" className="text-2xl font-bold text-emerald-800 tracking-tight">
        EcoSort
      </Link>

      {/* Bagian Tengah: Menu Navigasi (Disembunyikan kalau di HP) */}
      <div className="hidden md:flex space-x-8 text-sm">
        <Link to="/" className={getLinkClass("/")}>Beranda</Link>
        <Link to="/klasifikasi" className={getLinkClass("/klasifikasi")}>Klasifikasi</Link>
        <Link to="/edukasi" className={getLinkClass("/edukasi")}>Edukasi</Link>
        <Link to="/kategori" className={getLinkClass("/kategori")}>Kategori Sampah</Link>
      </div>

      {/* Bagian Kanan: Ikon & Tombol CTA */}
      <div className="flex items-center space-x-5">
        <Link to="/klasifikasi" className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 rounded-md hover:bg-emerald-900 transition-colors shadow-sm">
          Mulai Sekarang
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;