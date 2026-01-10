CREATE DATABASE IF NOT EXISTS campusfix_db;
USE campusfix_db;

-- TABEL 1: Kategori (Wajib ada duluan karena jadi induk)
CREATE TABLE IF NOT EXISTS kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);

-- Isi data kategori default
INSERT INTO kategori (nama_kategori) VALUES 
('Kelistrikan'), 
('Pipa & Air'), 
('Fasilitas Kelas'), 
('Lainnya');

-- TABEL 2: Laporan (Punya kolom id_kategori)
CREATE TABLE IF NOT EXISTS laporan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kategori INT, 
    judul VARCHAR(255) NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    -- INI KOLOM BARU:
    status ENUM('Pending', 'Proses', 'Selesai') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_kategori) REFERENCES kategori(id)
);

-- Isi data dummy biar gak sepi
INSERT INTO laporan (id_kategori, judul, lokasi, deskripsi) VALUES 
(1, 'Lampu Kedip-kedip', 'Ruang 101', 'Bikin pusing pas kuliah'),
(2, 'Keran Patah', 'Toilet Lt 2', 'Air muncrat terus');