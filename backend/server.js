const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { GoogleGenAI } = require('@google/genai');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Inisiasi Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy-key' });

// Middleware
app.use(cors());
app.use(express.json());

// Setup Multer pakai Memory Storage biar gampang diterusin ke Flask
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint Test
app.get('/', (req, res) => {
  res.send('Backend EcoSort siap meluncur!');
});

// ENDPOINT UTAMA KLASIFIKASI
app.post('/api/classify', upload.single('image'), async (req, res) => {
  try {
    // 1. Cek apakah ada gambar dari React
    if (!req.file) {
      return res.status(400).json({ message: 'Gambar tidak ditemukan!' });
    }

    console.log('Gambar diterima dari Frontend, ukuran:', req.file.size, 'bytes');

    // 2. MENGIRIM GAMBAR KE FLASK TIM AI
    let aiLabel = "";
    let aiAkurasi = "";

    try {
      // INI KODE ASLI YANG NEMBAK KE HUGGING FACE
      const form = new FormData();
      form.append('file', req.file.buffer, req.file.originalname);

      console.log('Mengirim gambar ke API AI Hugging Face...');
      const flaskResponse = await axios.post(process.env.FLASK_API_URL, form, {
        headers: { ...form.getHeaders() }
      });
      
      // Mengambil data sesuai format JSON dari tim AI (prediction & confidence)
      aiLabel = flaskResponse.data.prediction; 
      // Karena confidence berbentuk angka (misal: 100), diubah jadi string dan tambah persen
      aiAkurasi = `${flaskResponse.data.confidence}%`; 
      
      console.log(`Berhasil! AI nebak ini: ${aiLabel} dengan akurasi ${aiAkurasi}`);

    } catch (flaskError) {
      console.error('Error ke Flask:', flaskError.message);
      return res.status(500).json({ message: 'Gagal menghubungi API AI di Hugging Face' });
    }

    // 3. MINTA EDUKASI & IDENTIFIKASI KE GEMINI (Multimodal)
    let geminiTips = [];
    let namaSpesifik = aiLabel; 
    
    try {
      console.log(`Menghubungi Gemini untuk identifikasi gambar dan tips...`);
      
      const prompt = `Saya memiliki gambar sampah. AI model CNN saya mengklasifikasikan ini ke dalam kategori umum: "${aiLabel}".
      Tugas Anda sebagai pakar lingkungan:
      1. Identifikasi nama benda/sampah spesifik apa yang ada di dalam gambar tersebut (misal: "Sisa Kulit Buah dan Sayuran Campur", "Botol Plastik", "Kardus", "Baterai", dll). JIKA gambar kabur, terlalu rumit, atau Anda tidak yakin, JANGAN MENGARANG. Cukup gunakan nama umum seperti "Sampah ${aiLabel} Campuran".
      2. Berikan tepat 3 langkah singkat, kreatif dan logis untuk mendaur ulang atau menangani sampah spesifik tersebut. Pastikan tipsnya masuk akal untuk kategori ${aiLabel}.
      
      Balas HANYA dalam format JSON yang persis seperti ini tanpa markdown, tanpa penjelasan lain:
      {
        "nama_spesifik": "Nama benda yang kamu tebak",
        "tips": [
          {"judul": "Langkah 1", "isi": "Deskripsi singkat"},
          {"judul": "Langkah 2", "isi": "Deskripsi singkat"},
          {"judul": "Langkah 3", "isi": "Deskripsi singkat"}
        ]
      }`;

      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'masukkan_api_key_gemini_lo_disini_nanti') {
         // Kirim teks prompt sekaligus file gambar ke Gemini
         const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: [
                 prompt,
                 {
                     inlineData: {
                         data: req.file.buffer.toString("base64"), // Ubah gambar jadi base64 string
                         mimeType: req.file.mimetype
                     }
                 }
             ]
         });
         
         const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
         const parsedData = JSON.parse(rawText);
         
         namaSpesifik = parsedData.nama_spesifik;
         geminiTips = parsedData.tips;
         console.log(`Gemini berhasil menebak: ${namaSpesifik}`);

      } else {
         throw new Error("API Key Gemini belum diatur.");
      }

    } catch (geminiError) {
      console.error('Error ke Gemini/Limit Tercapai:', geminiError);
      // Fallback aman kalau Gemini error atau kena limit
      namaSpesifik = `Sampah ${aiLabel} (Spesifik tidak diketahui)`;
      geminiTips = [
        { judul: "Pisahkan Sampah", isi: `Pastikan sampah ${aiLabel} ini dipisahkan dari jenis lainnya.` },
        { judul: "Bersihkan", isi: "Bilas jika perlu agar tidak mengontaminasi." },
        { judul: "Buang Sesuai Tempat", isi: `Masukkan ke dalam tempat sampah kategori ${aiLabel}.` }
      ];
    }

    // 4. GABUNGKAN DATA & KIRIM KE REACT
    const finalData = {
      nama: namaSpesifik, 
      kategori: aiLabel,  // Kategori besar tetep dari hasil CNN tim AI 
      akurasi: aiAkurasi,
      daurUlang: "Tinggi",
      deskripsi: "Klasifikasi kategori oleh CNN, identifikasi spesifik oleh Gemini AI.",
      instruksi: geminiTips.map((tip, index) => ({
        judul: tip.judul,
        isi: tip.isi,
        icon: index === 0 ? "💧" : index === 1 ? "🗜️" : "🌱",
        highlight: index === 2
      }))
    };

    // 5. SIMPAN KE DATABASE MYSQL
    try {
      const insertQuery = 'INSERT INTO histories (nama_sampah, kategori, akurasi) VALUES (?, ?, ?)';
      await db.execute(insertQuery, [finalData.nama, finalData.kategori, finalData.akurasi]);
      console.log('✅ Riwayat scan berhasil disimpan ke database!');
    } catch (dbError) {
      console.error('❌ Gagal menyimpan ke database:', dbError);
    }

    res.json(finalData);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Backend EcoSort jalan di http://localhost:${PORT}`);
});

// ENDPOINT STATISTIK UNTUK HALAMAN EDUKASI 
app.get('/api/stats', async (req, res) => {
  try {
    // Menghitung total semua scan
    const query = `
      SELECT 
        COUNT(*) AS total_scan
      FROM histories
    `;
    const [rows] = await db.execute(query);
    const data = rows[0];

    res.json({
      totalScan: data.total_scan || 0
    });
  } catch (error) {
    console.error('Gagal mengambil statistik:', error);
    res.status(500).json({ message: 'Error mengambil data statistik' });
  }
});