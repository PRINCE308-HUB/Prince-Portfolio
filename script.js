// ---------------- SECTION CONTROL ----------------
const sections = ['home','about','skills','projects','contact'];

// Navigation sections handled via CSS and scrolling


// ---------------- MOBILE MENU ----------------
const menuBtn = document.getElementById('mobile-menu-button');
const nav = document.getElementById('main-nav');

if(menuBtn){
  menuBtn.onclick = () => {
    nav.classList.toggle('hidden');
  };
}


// ---------------- CURSOR GLOW ----------------
let mouseX = 0;
let mouseY = 0;
let glowEl = null;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateGlow() {
  if (!glowEl) glowEl = document.getElementById('cursor-glow');
  if (glowEl) {
    glowEl.style.left = mouseX + 'px';
    glowEl.style.top = mouseY + 'px';
  }
  requestAnimationFrame(updateGlow);
}
requestAnimationFrame(updateGlow);


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
//--------------------------FILTER-------------------------------
document.addEventListener("DOMContentLoaded", () => {

  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#toolbox-grid .tool-card");

  filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      /* active button */
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {

        const category = card.dataset.category;

        if (filter === "all" || category === filter) {

          card.style.display = "block";

          setTimeout(() => {
            card.classList.remove("hide");
            card.classList.add("show");
          }, 10);

        } else {

          card.classList.remove("show");
          card.classList.add("hide");

          setTimeout(() => {
            card.style.display = "none";
          }, 350);

        }

      });

    });

  });

});
/* ================= ACTIVE NAVBAR ================= */

const navSections = document.querySelectorAll(
  "#home, #about, #skills, #projects, #contact"
);

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  navSections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {

      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active-nav");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-nav");
    }

  });

});
/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});

// ---------------- PARTICLES.JS ----------------
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": { "enable": true, "value_area": 800 }
      },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 250,
          "line_linked": { "opacity": 0.8 }
        },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
}
