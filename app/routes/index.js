const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 1. HOME
router.get('/', async (req, res) => {
    try {
        const sql = `
            SELECT laporan.*, kategori.nama_kategori 
            FROM laporan 
            LEFT JOIN kategori ON laporan.id_kategori = kategori.id 
            ORDER BY laporan.id DESC
        `;
        const [rows] = await db.query(sql);
        res.render('index', { laporan: rows, title: 'CampusFix - Lapor Kerusakan' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Database Error');
    }
});

// 2. FORM TAMBAH
router.get('/tambah', async (req, res) => {
    try {
        const [kategori] = await db.query("SELECT * FROM kategori");
        res.render('tambah', { title: 'Buat Laporan', kategori }); 
    } catch (error) {
        res.status(500).send('Error memuat kategori');
    }
});

// 3. PROSES SIMPAN
router.post('/tambah', async (req, res) => {
    const { id_kategori, judul, lokasi, deskripsi } = req.body;
    try {
        await db.query("INSERT INTO laporan (id_kategori, judul, lokasi, deskripsi) VALUES (?, ?, ?, ?)", 
        [id_kategori, judul, lokasi, deskripsi]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Gagal menyimpan.");
    }
});

// 4. FORM EDIT
router.get('/edit/:id', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM laporan WHERE id = ?", [req.params.id]);
        const [kategori] = await db.query("SELECT * FROM kategori");
        
        if (rows.length === 0) return res.redirect('/');

        res.render('edit', { title: 'Edit Laporan', laporan: rows[0], kategori });
    } catch (error) {
        res.status(500).send('Database Error');
    }
});

// 5. PROSES UPDATE (PENTING: Status diupdate disini)
router.post('/update/:id', async (req, res) => {
    const { id_kategori, judul, lokasi, deskripsi, status } = req.body;
    try {
        const sql = "UPDATE laporan SET id_kategori=?, judul=?, lokasi=?, deskripsi=?, status=? WHERE id=?";
        await db.query(sql, [id_kategori, judul, lokasi, deskripsi, status, req.params.id]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal update data');
    }
});

// 6. HAPUS
router.get('/hapus/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM laporan WHERE id = ?", [req.params.id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Gagal hapus data');
    }
});

module.exports = router;