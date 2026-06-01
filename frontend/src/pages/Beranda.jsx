import { Link } from 'react-router-dom';
import botolImage from '../assets/botol-ai.jpg';

const Beranda = () => {
  return (
    <div className="bg-white">
      {/* SECTION 1: HERO BANNER */}
      <main className="max-w-7xl mx-auto px-10 pt-20 pb-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 leading-tight">
            Kenali Jenis Sampah dengan AI Secara Real-Time
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Mulai langkah kecilmu untuk lingkungan yang lebih bersih. Gunakan teknologi kecerdasan buatan kami untuk mengklasifikasikan sampah secara instan dan pelajari cara pengelolaannya yang tepat.
          </p>
          <div className="pt-2">
            <Link to="/klasifikasi" className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-emerald-800 rounded-md hover:bg-emerald-900 transition-all shadow-md hover:shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Coba Klasifikasi Sekarang
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute -inset-4 bg-emerald-100 rounded-[2rem] blur-xl opacity-50"></div>
          <div className="relative bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center justify-center min-h-[400px] border-4 border-white overflow-hidden">
          <img src={botolImage} alt="Ilustrasi Botol AI"/>
          
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Plastic Bottle</p>
                  <p className="text-emerald-200/80 text-xs">PETE (1) - Recyclable</p>
                </div>
              </div>
              <div className="text-emerald-300 font-bold text-xl">99%</div>
            </div>
          </div>
        </div>
      </main>

      {/* SECTION 2: FITUR UTAMA */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Fitur Utama Platform</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Sistem klasifikasi cerdas kami didesain untuk memudahkan Anda dalam mengelola sampah rumah tangga dan industri.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Fitur */}
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Klasifikasi CNN", desc: "Menggunakan arsitektur Convolutional Neural Network terkini untuk mendeteksi objek dengan akurasi tinggi secara real-time." },
              { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", title: "Kategori Lengkap", desc: "Mendukung deteksi berbagai jenis sampah mulai dari Organik, Anorganik (Plastik, Kertas, Kaca), hingga bahan Berbahaya (B3)." },
              { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Edukasi Terintegrasi", desc: "Setiap hasil klasifikasi dilengkapi panduan penanganan yang tepat dan dampak lingkungannya untuk meningkatkan kesadaran." }
            ].map((fitur, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fitur.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{fitur.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CARA KERJA AI */}
      <section className="py-20 max-w-7xl mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Cara Kerja AI Kami</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Proses klasifikasi yang cepat dan mudah dalam tiga langkah sederhana.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Step */}
          {[
            { 
              step :"1",   
              title: "Upload Foto", 
              desc: "Unggah foto dari galeri perangkat Anda ke platform kami.",
              icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" // Ikon Upload
            },
            { 
              step :"2",   
              title: "AI Mengklasifikasi", 
              desc: "Model CNN kami memproses gambar dalam hitungan detik untuk mengidentifikasi objek dan menentukan persentase keyakinan.",
              icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
            },
            { 
              step :"3",   
              title: "Belajar & Bertindak", 
              desc: "Dapatkan hasil klasifikasi beserta instruksi pembuangan yang tepat dan artikel edukasi terkait jenis sampah tersebut.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z" 
            }
          ].map((item, index) => (
            <div key={index} className="bg-emerald-100/40 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden group hover:bg-emerald-100/80 transition-all duration-300 shadow-sm hover:shadow-md">
              
               <div className="absolute -top-0 -right-0 text-7xl font-black text-emerald-600 opacity-10 select-none group-hover:scale-100 transition-transform duration-500">
                {item.step}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-emerald-50">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Beranda;