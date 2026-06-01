import { useState, useRef } from 'react';
import axios from 'axios';

const Klasifikasi = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  const fileInputRef = useRef(null);

  // LOGIC UNTUK UPLOAD GAMBAR 
  const handleFileChange = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); 
    } else {
      alert('Tolong upload file gambar (JPG/PNG) ya!');
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // LOGIC PREDIKSI ASLI (FRONTEND KE BACKEND) 
  const handlePredict = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setResult(null); 

    // Siapkan data foto pakai FormData 
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Tembak ke API Express yang lagi jalan di port 5000
      const response = await axios.post('http://localhost:5000/api/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Begitu dapat balasan, masukin ke state buat ditampilin di layar
      setResult(response.data);

    } catch (error) {
      console.error("Gagal klasifikasi:", error);
      alert("Waduh, gagal menghubungi server! Pastikan terminal Backend (port 5000) lagi jalan.");
    } finally {
      setIsAnalyzing(false); 
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* Header Halaman */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">Klasifikasi Sampah AI</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Unggah foto sampah Anda, dan AI kami akan menganalisis komposisi bahannya untuk memberikan instruksi pemilahan yang akurat.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* KOLOM KIRI: AREA UPLOAD */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
              isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            } ${preview ? 'border-none p-0 bg-transparent overflow-hidden' : 'min-h-[300px]'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !preview && fileInputRef.current.click()}
          >
            {!preview && (
              <>
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Tarik & Lepas Gambar</h3>
                <p className="text-sm text-gray-500 mb-6">atau klik untuk memilih dari perangkat Anda</p>
                <p className="text-xs text-gray-400">Mendukung JPG, PNG (Maks 5MB)</p>
                <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files[0])} accept="image/jpeg, image/png" className="hidden" />
              </>
            )}

            {preview && (
              <div className="relative w-full rounded-2xl overflow-hidden group">
                <img src={preview} alt="Preview" className="w-full h-auto max-h-[400px] object-contain bg-black/5" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null); setResult(null); }}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus gambar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
          </div>

          {/* Tombol Prediksi */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handlePredict}
            disabled={!image || isAnalyzing}
            className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all w-full justify-center border-2 ${
              !image 
                ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' 
                : isAnalyzing 
                  ? 'border-emerald-200 text-emerald-600 bg-emerald-50 cursor-wait' 
                  : result 
                    ? 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300' 
                    : 'border-emerald-800 text-white bg-emerald-800 hover:bg-emerald-900 shadow-md' 
            }`}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-emerald-600">AI Sedang Menganalisis...</span>
              </>
            ) : (
              <>
                {result ? (
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                ) : (
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                )}
                {result ? 'Prediksi Ulang' : 'Mulai Prediksi'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* KOLOM KANAN: HASIL KLASIFIKASI (MUNCUL KALAU ADA HASIL) */}
      {result && (
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-md border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center text-emerald-600 mb-4 font-semibold">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Klasifikasi Selesai
          </div>
          
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold text-gray-800">{result.nama}</h2>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold border border-emerald-200">
              {result.akurasi} Akurasi
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-6">{result.deskripsi}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Kategori</p>
              <div className="flex items-center text-gray-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                {result.kategori}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Tingkat Daur Ulang</p>
              <div className="text-gray-800 font-bold">{result.daurUlang}</div>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4">Tindakan Pengelolaan</h3>
          <div className="space-y-3">
            {result.instruksi.map((item, index) => (
              <div key={index} className="flex p-4 rounded-xl border bg-white border-gray-200">
                <div className="text-2xl mr-4">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{item.judul}</h4>
                  <p className="text-xs mt-1 text-gray-500">{item.isi}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => { setImage(null); setPreview(null); setResult(null); }}
            className="mt-6 w-full py-3 bg-emerald-800 text-white font-semibold rounded-xl hover:bg-emerald-900 shadow-md transition-colors"
          >
            Pindai Lagi
          </button>
        </div>
      )}
      
      </div>
    </main>
  );
};

export default Klasifikasi;