// ---------------- VOLUMETRIC ENERGY NEBULA ----------------
const nebulaCanvas = document.getElementById("nebula-canvas");
if (nebulaCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = nebulaCanvas.getContext("2d");
  let width, height;
  
  function resize() {
    width = nebulaCanvas.width = window.innerWidth;
    height = nebulaCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let time = 0;
  
  // Creates highly defined, intertwining string-like ribbons
  function drawRibbon(timeOffset, side, color, numLines, spread) {
    const baseEdge = width * 0.15; 
    
    for (let l = 0; l < numLines; l++) {
      ctx.beginPath();
      
      for (let y = -50; y <= height + 50; y += 20) {
        // Mathematical waves for smooth flow
        const wave1 = Math.sin((y * 0.002) + time + timeOffset) * (width * 0.1);
        const wave2 = Math.sin((y * 0.003) - (time * 0.5) + timeOffset) * (width * 0.05);
        
        // Create 3D twisting effect by offsetting each line in the ribbon differently
        const twist = Math.sin(y * 0.001 + time * 1.5 + (l * 0.1)) * spread;
        
        let x;
        if (side === 'left') {
          x = wave1 + wave2 + twist + baseEdge + (l * 2); 
        } else {
          x = width - (wave1 + wave2 + twist + baseEdge + (l * 2));
        }
        
        if (y === -50) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function render() {
    // Clear canvas - highly optimized without native blur
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Additive blending for luminous energy effect
    ctx.globalCompositeOperation = 'lighter';
    
    // Draw defined layers (no blur) - vastly improves scrolling performance
    // Left side ribbons
    drawRibbon(0, 'left', `rgba(251, 146, 60, 0.25)`, 18, 40);
    drawRibbon(10, 'left', `rgba(245, 158, 11, 0.2)`, 12, 60);
    drawRibbon(5, 'left', `rgba(255, 200, 100, 0.15)`, 5, 20); // Bright core highlight
    
    // Right side ribbons
    drawRibbon(5, 'right', `rgba(251, 146, 60, 0.25)`, 18, 40);
    drawRibbon(15, 'right', `rgba(245, 158, 11, 0.2)`, 12, 60);
    drawRibbon(20, 'right', `rgba(255, 200, 100, 0.15)`, 5, 20); // Bright core highlight

    time += 0.003; // Smooth drifting
    requestAnimationFrame(render);
  }

  render();
}

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


// ---------------- TYPING SUBTITLE (REMOVED) ----------------


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
  const marqueeTracks = document.querySelectorAll(".marquee-track");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      
      const allCards = document.querySelectorAll("#toolbox-grid .tool-card:not(.is-clone)");
      const allClones = document.querySelectorAll("#toolbox-grid .tool-card.is-clone");

      if (filterValue === "all") {
        // Restore Marquee mode
        marqueeTracks[0].classList.add("animate-marquee");
        marqueeTracks[1].classList.add("animate-marquee-reverse");
        marqueeTracks.forEach(track => {
          track.classList.remove("flex-wrap", "justify-center");
          track.classList.add("w-max");
        });
        
        allCards.forEach(card => card.style.display = "block");
        allClones.forEach(clone => clone.style.display = "block");
      } else {
        // Disable Marquee mode
        marqueeTracks[0].classList.remove("animate-marquee");
        marqueeTracks[1].classList.remove("animate-marquee-reverse");
        marqueeTracks.forEach(track => {
          track.classList.add("flex-wrap", "justify-center");
          track.classList.remove("w-max");
        });
        
        allClones.forEach(clone => clone.style.display = "none");
        
        allCards.forEach(card => {
          if (card.getAttribute("data-category") === filterValue) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  });
});
//--------------------------PAGE LOAD & SCROLL ANIMATIONS-------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fade in background
  const canvas = document.getElementById("nebula-canvas");
  if (canvas) {
    setTimeout(() => {
      canvas.classList.remove("opacity-0");
    }, 100);
  }

  // 2. Cascade hero elements
  const hiddenElements = document.querySelectorAll('.load-hidden');
  if (hiddenElements.length > 0) {
    setTimeout(() => {
      hiddenElements.forEach(el => {
        el.classList.remove('load-hidden');
        el.classList.add('load-fade-up');
      });
    }, 100);
  }
  
  // Navbar animation logic moved to window load event
});

// 4. Scroll Intersection Observer for remaining sections
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll('.reveal-hidden');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-hidden');
          entry.target.classList.add('reveal-show');
        } else {
          entry.target.classList.remove('reveal-show');
          entry.target.classList.add('reveal-hidden');
        }
      });
    }, {
      root: null,
      threshold: 0.15, // Trigger when 15% of the section is visible
      rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});

// 5. Navbar Entrance Animation on Window Load
window.addEventListener("load", () => {
  const navHidden = document.querySelectorAll('.nav-load-hidden');
  if (navHidden.length > 0) {
    // Delay 200ms after full page load so background appears first
    setTimeout(() => {
      navHidden.forEach(el => {
        el.classList.remove('nav-load-hidden');
        el.classList.add('nav-load-fade-down');
      });
    }, 200);
  }
});
/* ================= SCROLL LISTENERS (THROTTLED) ================= */

const navSections = document.querySelectorAll("#home, #about, #skills, #projects, #contact");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");

let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      
      // 1. Navbar background effect
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // 2. Active nav link highlighter
      let current = "";
      navSections.forEach(section => {
        // Only calculate offset top once inside the rAF
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active-nav");
        }
      });

      isScrolling = false;
    });
    isScrolling = true;
  }
});

// ---------------- STATIC STARS & SHOOTING STARS ----------------
const starsContainer = document.getElementById("stars-container");

if (starsContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  
  // Generate static stars
  function createStaticStars() {
    const numStars = 150; // Dense starfield like the image
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("static-star");
      
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 2.5 + 0.5; // 0.5px to 3px
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Twinkle duration between 2s and 6s
      const twinkleDuration = 2 + Math.random() * 4;
      star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
      
      // Random animation delay so they don't pulse together
      star.style.animationDelay = `-${Math.random() * 5}s`;
      
      // Add a slight orange tint to some stars
      if (Math.random() > 0.7) {
        star.style.background = "#fb923c"; // Orange
      }
      
      starsContainer.appendChild(star);
    }
  }
  
  createStaticStars();

  // Shooting Star Logic
  function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    
    // Randomize starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight * 0.5); // mostly start from upper half
    
    // Travel diagonally
    const angle = 35 + Math.random() * 20; // 35 to 55 degrees
    const travelDistance = 500 + Math.random() * 800; // 500px to 1300px
    const travelX = Math.cos(angle * Math.PI / 180) * travelDistance;
    const travelY = Math.sin(angle * Math.PI / 180) * travelDistance;
    
    // Randomize duration
    const duration = 1.5 + Math.random() * 2; // 1.5s to 3.5s
    
    star.style.left = startX + "px";
    star.style.top = startY + "px";
    star.style.setProperty('--angle', `${angle}deg`);
    star.style.setProperty('--travelX', `${travelX}px`);
    star.style.setProperty('--travelY', `${travelY}px`);
    star.style.animationDuration = `${duration}s`;
    
    starsContainer.appendChild(star);
    
    // Remove after animation finishes
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
    
    // Schedule next star
    const nextSpawnTime = 300 + Math.random() * 800; // 0.3 to 1.1 seconds
    setTimeout(createShootingStar, nextSpawnTime);
  }

  // Start the first star loop after a slight delay
  setTimeout(createShootingStar, 500);
}

// ---------------- FORCE TOP ON REFRESH ----------------
// Prevent the browser from remembering the scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ---------------- 3D CYBER-GLOW PROJECT CARDS ----------------
const projectWraps = document.querySelectorAll('.project-3d-wrap');

projectWraps.forEach(wrap => {
  const card = wrap.querySelector('.project-card-inner') || wrap.querySelector('.contact-card-inner');
  const glow = wrap.querySelector('.glow');

  wrap.addEventListener('mousemove', (e) => {
    card.classList.add('is-hovered');

    // Get dimensions of the wrap
    const rect = wrap.getBoundingClientRect();
    
    // Mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the glow to follow the mouse
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

    // Calculate rotation (max rotation 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(251,146,60,0.15)`;
  });

  wrap.addEventListener('mouseleave', () => {
    card.classList.remove('is-hovered');
    // Reset transform to lay flat
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
  });
});
