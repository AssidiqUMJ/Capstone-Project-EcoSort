const Kategori = () => {
  const kategoriData = [
    {
      id: "organik",
      title: "Sampah Biologis",
      badge: "Organik",
      badgeClass: "bg-emerald-100 text-emerald-700",
      iconBox: "bg-emerald-200/50 text-emerald-800",
      icon: "M4.5 12.75l6 6 9-13.5", 
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      desc: "Bahan alami yang dapat terurai. Termasuk: material biologis, sisa makanan, kulit sayuran, sisa buah, limbah kebun, dan daun/ranting.",
      methodTitle: "Metode Daur Ulang",
      methodVal: "Pengomposan"
    },
      {
        id: "anorganik",
        title: "Sampah Sintetis",
        badge: "Anorganik",
        badgeClass: "bg-blue-100 text-blue-700",
        iconBox: "bg-blue-200/50 text-blue-800",
        svg: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
        desc: "Bahan buatan manusia yang tidak mudah terurai secara alami. Termasuk: Plastic, Shoes, Clothes, Cardboard, Paper, Glass, dan Metal.",
        methodTitle: "Metode Daur Ulang",
        methodVal: "Fasilitas Pemulihan Material (MRF)"
      },
      {
        id: "b3",
        title: "Sampah Berbahaya (B3)",
        badge: "B3",
        badgeClass: "bg-orange-100 text-orange-700",
        iconBox: "bg-orange-200/50 text-orange-800",
        svg: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
        desc: "Bahan yang mengandung zat beracun atau berbahaya. Termasuk: Battery, lampu bohlam/neon, limbah elektronik (e-waste), dan bahan kimia.",
        methodTitle: "Metode Penanganan",
        methodVal: "Pusat Pengumpulan Khusus Limbah B3"
      }
    ];

    return (
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        
        {/* Header Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">Katalog Klasifikasi Sampah</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Pahami berbagai kategori sampah untuk memastikan daur ulang yang tepat dan meminimalkan dampak lingkungan.
          </p>
        </div>

        {/* Grid Kartu Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kategoriData.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              
              {/* Bagian Ikon & Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.iconBox}`}>
                  {item.svg}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${item.badgeClass}`}>
                  {item.badge}
                </span>
              </div>

              {/* Judul & Deskripsi */}
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {item.desc}
                </p>
              </div>

              {/* Kotak Metode di Bagian Bawah */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center text-gray-600 mb-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">{item.methodTitle}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.methodVal}</p>
              </div>

            </div>
          ))}
        </div>

      </main>
    );
  };

  export default Kategori;