searchForm = document.querySelector('.search-form');

document.querySelector('search-btn').onclick = () => {
   searchForm.classList.toggle('active');
}

window.onscroll = () => {

   searchForm.classList.remove('active');
   
   if(window.scrollY > 80) {
      document.querySelector('.header .header-2').classList.add('active');
   }else{
      document.querySelector('.header .header-2').classList.remove('active');
   }
}

window.onload = () => {
   if(window.scrollY > 80) {
      document.querySelector('.header .header-2').classList.add('active');
   }else{
      document.querySelector('.header .header-2').classList.remove('active');
   }
}

let slideIndex = 1;
showSlides(slideIndex);

// Function สำหรับควบคุมปุ่ม "Next" และ "Previous"
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function สำหรับการเลือกสไลด์จากจุด (Dot)
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function สำหรับแสดงสไลด์
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // ตรวจสอบว่าเลขสไลด์เกินจำนวนสไลด์หรือไม่
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // ซ่อนทุกสไลด์ก่อน
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // ลบคลาส "active" ออกจากทุก dot
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // แสดงสไลด์ที่ถูกเลือก
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Function สำหรับสไลด์อัตโนมัติ
let autoSlideIndex = 0;
autoShowSlides();

function autoShowSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");

    // ซ่อนทุกสไลด์ก่อน
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // เพิ่มตัวนับ autoSlideIndex
    autoSlideIndex++;
    if (autoSlideIndex > slides.length) {
        autoSlideIndex = 1;
    }

    // แสดงสไลด์ตามลำดับ
    slides[autoSlideIndex - 1].style.display = "block";

    // ตั้งเวลาการสไลด์ทุก 5 วินาที
    setTimeout(autoShowSlides, 5000);
}