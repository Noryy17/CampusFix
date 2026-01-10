# import image node versi 18 alpine
FROM node:18-alpine

# 2. Buat folder kerja di dalam container
WORKDIR /app

# 3. Copy file package.json dulu (biar install dependencies)
COPY package*.json ./

# 4. Install library yang dibutuhkan (node_modules)
RUN npm install

# 5. Copy semua kode aplikasi sisanya
COPY . .

# 6. Buka Port 3000 (Sesuai app.js)
EXPOSE 3000

# 7. Perintah menjalankannya
CMD ["node", "app.js"]