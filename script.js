// ---------------- SECTION CONTROL ----------------
const sections = ['home','about','skills','projects','contact'];

function showSection(id){
  sections.forEach(sec=>{
    const el = document.getElementById(sec);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');

  window.scrollTo({top:0,behavior:'smooth'});
}
function openSection(id) {
  document.getElementById("main-content").style.display = "none";
  document.getElementById("contact").classList.add("hidden");

  document.getElementById(id).classList.remove("hidden");
}

function closeSection() {
  document.getElementById("main-content").style.display = "block";
  document.getElementById("contact").classList.add("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}
// Optional (keep if you want tab-style navigation)
// showSection('home');


// ---------------- MOBILE MENU ----------------
const menuBtn = document.getElementById('mobile-menu-button');
const nav = document.getElementById('main-nav');

if(menuBtn){
  menuBtn.onclick = () => {
    nav.classList.toggle('hidden');
  };
}


// ---------------- CURSOR GLOW ----------------
document.addEventListener('mousemove', e=>{
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});


// ---------------- TYPING SUBTITLE ----------------
const subtitles = [
  "Interactive Web Designer",
  "Creative Developer",
  "Animated Web Enthusiast"
];

let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeSubtitle() {
  const element = document.getElementById("typing-subtitle");
  if (!element) return;

  const currentText = subtitles[subtitleIndex];

  if (!isDeleting) {
    element.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    element.textContent = currentText.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    }
  }

  setTimeout(typeSubtitle, isDeleting ? 50 : 80);
}

typeSubtitle();


// ---------------- SCROLL PROGRESS BAR ----------------
window.addEventListener("scroll", ()=>{
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  const st = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;

  bar.style.width = (st/h)*100 + "%";
});


// ---------------- REVEAL ANIMATION ----------------
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ---------------- INFINITY COUNTER ----------------
window.addEventListener("DOMContentLoaded", () => {
  const infinityEl = document.getElementById("infinity-counter");
  if (!infinityEl) return;

  let count = 1;

  function startCounting() {
    const interval = setInterval(() => {

      count = Math.floor(count * 1.4 + Math.random() * 1000);

      if (count >= 99999999) {
        clearInterval(interval);
        infinityEl.textContent = "∞";
        infinityEl.classList.add("infinity-final");
      } else {
        infinityEl.textContent = count.toLocaleString();
      }

    }, 40);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounting();
      observer.disconnect();
    }
  });

  observer.observe(infinityEl);
});
/* hidden cards */
.tool-card.hide {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  position: absolute;
}

/* visible cards */
.tool-card.show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  position: relative;
}
