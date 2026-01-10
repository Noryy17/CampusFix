// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
const mysql = require('mysql2');

// Kita buat 'Pool' koneksi.
// Analogi: Daripada bikin 1 jembatan (connection) yang antre, 
// kita bikin jalan tol (pool) biar banyak request bisa lewat barengan.
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Ini PENTING! Nanti nilainya 'db_service', bukan localhost.
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kita export versi 'Promise' biar nanti kodingnya bisa pakai gaya modern (async/await).
// Lebih rapi dan gampang dibaca daripada callback hell.
module.exports = pool.promise();
