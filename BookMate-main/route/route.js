const express = require('express'); 
const router = express.Router();
const User = require('../models/User');  // อ้างอิงโมเดล User

// เส้นทางสำหรับหน้าแรก
router.get('/', (req, res) => {
  res.render('index');  // เรนเดอร์ไฟล์ index.ejs
});

// เส้นทางสำหรับหน้า featured
router.get('/featured', (req, res) => {
  res.render('featured');  // เรนเดอร์ไฟล์ featured.ejs
});

// เส้นทางสำหรับหน้า explore
router.get('/explore', (req, res) => {
  res.render('explore');  // เรนเดอร์ไฟล์ explore.ejs
});

// เส้นทางสำหรับหน้า contact
router.get('/contact', (req, res) => {
  res.render('contact');  // เรนเดอร์ไฟล์ contact.ejs
});

// เส้นทางสำหรับแสดงหน้า login.ejs
router.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });  // เรนเดอร์ไฟล์ login.ejs
});

// เส้นทางสำหรับจัดการการสร้างบัญชีผู้ใช้
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // รับค่าจากฟอร์ม

  // ตรวจสอบว่าอีเมลมีเครื่องหมาย @
  if (!email.includes('@')) {
    return res.render('login', { error: 'Email must contain @', success: null });
  }

  try {
    // สร้างผู้ใช้ใหม่โดยไม่ต้องตรวจสอบว่าผู้ใช้มีอยู่แล้ว
    const newUser = new User({
      email: email,
      password: password // ใช้รหัสผ่านที่ผู้ใช้กรอก (ไม่เข้ารหัส)
    });

    await newUser.save(); // บันทึกผู้ใช้ลงในฐานข้อมูล
    return res.render('login', { error: null, success: 'สมัครสมาชิกสำเร็จ!' });
    
  } catch (err) {
    // จัดการข้อผิดพลาดจากการซ้ำซ้อนของข้อมูล
    if (err.code === 11000) {
      // ถ้าอีเมลถูกใช้ไปแล้ว ให้ล็อกอินสำเร็จทันที
      return res.render('login', { error: null, success: 'ล็อกอินสำเร็จ!' });
    }
    console.error('Error:', err); // แสดงข้อผิดพลาดทั่วไป
    res.render('login', { error: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้', success: null });
  }
});

module.exports = router;
