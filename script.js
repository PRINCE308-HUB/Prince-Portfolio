const sections=['home','about','games','projects','contact'];

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

