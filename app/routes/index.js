const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 1. RUTE HOME (Tampilkan data dengan JOIN tabel kategori)
router.get('/', async (req, res) => {
    try {
        // Kita gabungkan tabel laporan dan kategori biar nama kategorinya muncul
        const sql = `
            SELECT laporan.*, kategori.nama_kategori 
            FROM laporan 
            LEFT JOIN kategori ON laporan.id_kategori = kategori.id 
            ORDER BY laporan.id DESC
        `;
        const [rows] = await db.query(sql);

        res.render('index', { 
            laporan: rows,
            title: 'CampusFix - Lapor Kerusakan'
        });
    } catch (error) {
        console.error('Error Home:', error);
        res.status(500).send('Database Error');
    }
});

// 2. RUTE FORM (Ambil daftar Kategori dulu)
router.get('/tambah', async (req, res) => {
    try {
        // Ambil data kategori buat dropdown
        const [kategoriData] = await db.query("SELECT * FROM kategori");
        
        res.render('tambah', {
            title: 'Buat Laporan',
            kategori: kategoriData // Kirim data kategori ke HTML
        }); 
    } catch (error) {
        console.error('Error Halaman Tambah:', error);
        res.status(500).send('Gagal memuat kategori');
    }
});

// 3. RUTE SIMPAN (Simpan ID Kategori juga)
router.post('/tambah', async (req, res) => {
    // Tangkap id_kategori dari form
    const { id_kategori, judul, lokasi, deskripsi } = req.body;
    
    try {
        const sql = "INSERT INTO laporan (id_kategori, judul, lokasi, deskripsi) VALUES (?, ?, ?, ?)";
        await db.query(sql, [id_kategori, judul, lokasi, deskripsi]);

        console.log("Sukses simpan laporan!");
        res.redirect('/');
    } catch (error) {
        console.error("Gagal simpan:", error);
        res.status(500).send("Gagal menyimpan ke database.");
    }
});

// ... kode rute tambah yang tadi ...

// =========================================================
// 4. RUTE HALAMAN EDIT (GET) - Ambil data lama
// =========================================================
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Query 1: Ambil data laporan berdasarkan ID yang diklik
        const [rows] = await db.query("SELECT * FROM laporan WHERE id = ?", [id]);
        
        // Query 2: Ambil daftar kategori buat dropdown
        const [kategoriData] = await db.query("SELECT * FROM kategori");

        // Cek kalau data gak ketemu (misal iseng ganti ID di URL)
        if (rows.length === 0) {
            return res.redirect('/');
        }

        res.render('edit', {
            title: 'Edit Laporan',
            laporan: rows[0],     // Data laporan lama
            kategori: kategoriData // Data dropdown
        });

    } catch (error) {
        console.error('Error Edit Page:', error);
        res.status(500).send('Database Error');
    }
});

// =========================================================
// 5. RUTE PROSES UPDATE (POST) - Timpa data lama + STATUS
// =========================================================
router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    // Tangkap 'status' dari form edit
    const { id_kategori, judul, lokasi, deskripsi, status } = req.body;

    try {
        // Update query SQL memasukkan kolom status
        const sql = "UPDATE laporan SET id_kategori=?, judul=?, lokasi=?, deskripsi=?, status=? WHERE id=?";
        
        // Urutan array harus sama dengan urutan tanda tanya (?) di atas
        await db.query(sql, [id_kategori, judul, lokasi, deskripsi, status, id]);
        
        console.log(`Laporan ID ${id} status berubah jadi ${status}`);
        res.redirect('/');
    } catch (error) {
        console.error('Error Update:', error);
        res.status(500).send('Gagal update data');
    }
});
// =========================================================
// 6. RUTE PROSES HAPUS (GET) - Buang data
// =========================================================
router.get('/hapus/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM laporan WHERE id = ?", [id]);
        
        console.log(`Laporan ID ${id} berhasil dihapus`);
        res.redirect('/');
    } catch (error) {
        console.error('Error Hapus:', error);
        res.status(500).send('Gagal menghapus data');
    }
});

module.exports = router;