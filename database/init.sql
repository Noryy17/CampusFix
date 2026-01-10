CREATE DATABASE IF NOT EXISTS campusfix_db;
USE campusfix_db;

-- TABEL 1: Kategori
CREATE TABLE IF NOT EXISTS kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);

INSERT INTO kategori (nama_kategori) VALUES 
('Kelistrikan'), ('Pipa & Air'), ('Fasilitas Kelas'), ('Lainnya');

-- TABEL 2: Laporan
CREATE TABLE IF NOT EXISTS laporan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kategori INT, 
    judul VARCHAR(255) NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    status ENUM('Pending', 'Proses', 'Selesai') DEFAULT 'Pending', -- INI KUNCINYA
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id)
);

INSERT INTO laporan (id_kategori, judul, lokasi, deskripsi) VALUES 
(1, 'Lampu Kedip-kedip', 'Ruang 101', 'Bikin pusing pas kuliah');