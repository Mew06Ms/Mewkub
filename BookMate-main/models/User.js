const mongoose = require('mongoose'); // นำเข้า mongoose
const bcrypt = require('bcryptjs'); // นำเข้า bcryptjs

// สร้าง Schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'], // เพิ่มข้อความข้อผิดพลาด
        // ลบ unique เพื่ออนุญาตให้มีอีเมลซ้ำกัน
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // เพิ่มข้อความข้อผิดพลาด
        minlength: [8, 'Password must be at least 8 characters long'] // ตรวจสอบความยาวของรหัสผ่าน
    },
    createdAt: {
        type: Date,
        default: Date.now // บันทึกวันที่และเวลาที่สร้างข้อมูล
    }
}, { timestamps: true }); // ใช้ timestamps เพื่อให้ mongoose สร้าง createdAt และ updatedAt ให้โดยอัตโนมัติ

// ใช้ Middleware ก่อนบันทึกข้อมูลเพื่อตรวจสอบและเข้ารหัสรหัสผ่าน
userSchema.pre('save', async function(next) {
    // ตรวจสอบว่ารหัสผ่านถูกแก้ไขหรือไม่ก่อนเข้ารหัส
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // เข้ารหัสรหัสผ่าน
    }
    next();
});

// สร้างโมเดล User จาก Schema
const User = mongoose.model('User', userSchema);

module.exports = User;  
