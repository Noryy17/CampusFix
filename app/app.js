// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

// 1. Load Environment Variables dari file .env
dotenv.config();

// 2. Import Koneksi Database & Routes
const db = require('./config/database');
const indexRoutes = require('./routes/index'); // Kita akan buat ini setelah ini

const app = express();

// 3. Setup View Engine (EJS)
// Ini biar kita bisa pakai file .ejs di folder view/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// 4. Middleware
// Biar bisa baca data dari Form HTML (POST request)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set folder public untuk file statis (css, gambar, js) jika nanti butuh
app.use(express.static(path.join(__dirname, 'public')));

// 5. Routing
// Arahkan semua request ke file routes/index.js
app.use('/', indexRoutes);

// 6. Jalankan Server
// Kita hardcode port 3000 karena di Dockerfile kita EXPOSE 3000
const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Akses via Nginx di: http://localhost:${process.env.APP_PORT}`);
});