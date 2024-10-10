const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // เชื่อมต่อกับ MongoDB
const router = require('./route/route');  
const app = express();
const port = 3001;

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost/libraryDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// ตั้งค่า middleware สำหรับการจัดการไฟล์ static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ตั้งค่า view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ใช้ router สำหรับจัดการเส้นทางต่างๆ
app.use('/', router);

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
