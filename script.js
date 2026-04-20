const sections=['home','games','contact'];

function showSection(id){
  sections.forEach(sec=>{
    document.getElementById(sec).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

showSection('home');

// Mobile menu
const menuBtn=document.getElementById('mobile-menu-button');
const nav=document.getElementById('main-nav');

menuBtn.onclick=()=>{
  nav.classList.toggle('hidden');
};

document.addEventListener('mousemove',e=>{
  const glow=document.getElementById('cursor-glow');
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

const subtitles = [
  "Interactive Web Designer",
  "Creative Developer",
  "Animated Web Enthusiast"
];

let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 50;
const delayBetween = 1200;

function typeSubtitle() {
  const element = document.getElementById("typing-subtitle");
  const currentText = subtitles[subtitleIndex];

  if (!isDeleting) {
    element.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => isDeleting = true, delayBetween);
    }
  } else {
    element.textContent = currentText.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    }
  }

  setTimeout(typeSubtitle, isDeleting ? deletingSpeed : typingSpeed);
}

typeSubtitle();

window.addEventListener("scroll",()=>{
  const st=document.documentElement.scrollTop;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById("progress-bar").style.width=(st/h)*100+"%";
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
const infinityEl = document.getElementById("infinity-counter");

let count = 1;
let speed = 20; // lower = faster

window.addEventListener("DOMContentLoaded", () => {
  const infinityEl = document.getElementById("infinity-counter");
  if (!infinityEl) return;

  let count = 1;

  function startCounting() {
    const interval = setInterval(() => {

      // exponential growth feel 🔥
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
