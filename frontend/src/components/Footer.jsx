import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-10 flex flex-col items-center justify-between gap-6">
        
        <div>
          <Link to="/" className="text-2xl font-bold text-emerald-800 tracking-tight block mb-2">
            EcoSort
          </Link>
          <p className="text-gray-500 text-sm">
            © 2026 EcoSort. Pengelolaan Lingkungan & Logistik Sampah.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;