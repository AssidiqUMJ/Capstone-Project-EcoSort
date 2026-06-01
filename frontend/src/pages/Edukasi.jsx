import { Link } from 'react-router-dom';
import imgOrganik from '../assets/sampah-organik.jpg'; 
import imgPlastik from '../assets/sampah-botol-plastik.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Edukasi = () => {
  // Bikin wadah (state) buat nyimpen data dari database
  const [stats, setStats] = useState({ totalScan: 0, totalOrganik: 0 });

  // Panggil API Backend pas halaman ini dibuka
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Gagal mengambil data statistik:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-12">
      
     {/* SECTION 1: HERO BANNER EDUKASI */}
      <div className="relative bg-gradient-to-br from-slate-100 to-emerald-50 rounded-[2rem] p-10 md:p-16 overflow-hidden border border-emerald-100/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
            AKADEMI ECO
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Kuasai Seni <br/>
            <span className="text-emerald-800">Memilah Sampah yang Berkelanjutan</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Pelajari lebih dalam siklus hidup sampah. Pahami bagaimana pilihan harian Anda berdampak pada pelestarian lingkungan global dan pelajari teknik pemilahan profesional.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/kategori" className="px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-colors shadow-md text-center">
              Mulai Belajar
            </Link>
            <a href="#artikel" className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center">
              Telusuri Topik
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2: STATISTIK DAMPAK */}
      <div className="w-full">
        <div className="bg-emerald-800 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-lg flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700 rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10">
            <p className="text-emerald-200 text-sm font-bold tracking-wider mb-2 uppercase">Dampak Komunitas</p>
            <h2 className="text-7xl font-bold mb-4">{stats.totalScan}</h2>
            <h3 className="text-2xl font-semibold mb-3">Total Sampah Terklasifikasi</h3>
            <p className="text-emerald-100 max-w-3xl text-sm md:text-base leading-relaxed">
              Pengguna EcoSort telah berhasil membantu AI kami memilah sampah sebanyak ini secara sistematis dan real-time. Setiap pindaian adalah satu langkah menuju lingkungan yang lebih bersih.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ARTIKEL PILIHAN */}
      <div id="artikel">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Artikel Pilihan</h2>
            <p className="text-gray-500 text-sm mt-1">Pengetahuan ahli yang disesuaikan untuk dampak sehari-hari.</p>
          </div>
          <a href="https://waste4change.com/blog/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold text-sm hover:text-emerald-900 flex items-center">
            Lihat semua modul <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="https://waste4change.com/blog/pengertian-sampah-organik-contoh-gambar-manfaat/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="h-56 bg-slate-100 relative overflow-hidden">
              <img 
                src={imgOrganik} 
                alt="Tumpukan sisa sayuran dan buah untuk kompos" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800 z-10">Organik</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors">Siklus Hidup Sampah Organik</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Dari sisa dapur menjadi tanah kaya nutrisi. Pelajari proses biologis di balik pengomposan dan cara menghindari dekomposisi anaerobik di wadah rumah Anda.
              </p>
            </div>
          </a>

          <a href="https://waste4change.com/blog/contoh-sampah-anorganik-pengertian-jenis-manfaat/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="h-56 bg-slate-100 relative overflow-hidden">
              <img 
                src={imgPlastik} 
                alt="Berbagai jenis botol plastik bekas" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-800 z-10">Anorganik</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors">Plastik: Bedah Mendalam</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tidak semua plastik diciptakan sama. Pecahkan kode identifikasi resin dan pahami mengapa satu wadah yang tidak dicuci dapat mengontaminasi seluruh tumpukan.
              </p>
            </div>
          </a>
        </div>
      </div>

    </main>
  );
};

export default Edukasi;