import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react'; 

const Navbar = () => {
  const location = useLocation();
  // State untuk mengontrol buka-tutup menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Style untuk menu desktop
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "font-semibold text-emerald-700 border-b-2 border-emerald-700 pb-1"
      : "font-medium text-gray-600 hover:text-emerald-700 transition-colors pb-1";
  };

  // Style untuk menu mobile 
  const getMobileLinkClass = (path) => {
    return location.pathname === path
      ? "block px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-md"
      : "block px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors";
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        
        {/* Kiri: Logo */}
        <Link to="/" className="text-2xl font-bold text-emerald-800 tracking-tight">
          EcoSort
        </Link>

        {/* Tengah: Menu Desktop ( Disembunyikan ketika buka di HP) */}
        <div className="hidden md:flex space-x-8 text-sm">
          <Link to="/" className={getLinkClass("/")}>Beranda</Link>
          <Link to="/klasifikasi" className={getLinkClass("/klasifikasi")}>Klasifikasi</Link>
          <Link to="/edukasi" className={getLinkClass("/edukasi")}>Edukasi</Link>
          <Link to="/kategori" className={getLinkClass("/kategori")}>Kategori Sampah</Link>
        </div>

        {/* Kanan: Tombol Action Desktop */}
        <div className="hidden md:block">
          <Link to="/klasifikasi" className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            Mulai Sekarang
          </Link>
        </div>

        {/* Kanan: Tombol Hamburger Menu (Hanya muncul di HP) */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-emerald-800 focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/")}>Beranda</Link>
          <Link to="/klasifikasi" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/klasifikasi")}>Klasifikasi</Link>
          <Link to="/edukasi" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/edukasi")}>Edukasi</Link>
          <Link to="/kategori" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/kategori")}>Kategori Sampah</Link>
          
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Link to="/klasifikasi" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;