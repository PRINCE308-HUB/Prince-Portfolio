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
  const cards = document.querySelectorAll("#toolbox-grid .tool-card");
  const toolboxGrid = document.getElementById("toolbox-grid");

  // Dynamically lock the grid's height to prevent layout shifts when filtering
  function lockGridHeight() {
    if (!toolboxGrid) return;
    
    // Save current display states
    const states = Array.from(cards).map(card => card.style.display);
    
    // Force all cards to block to measure the full natural height
    cards.forEach(card => card.style.display = "block");
    toolboxGrid.style.minHeight = ''; 
    
    // Measure max height
    const fullHeight = toolboxGrid.offsetHeight;
    
    // Apply min-height
    toolboxGrid.style.minHeight = fullHeight + 'px';
    
    // Restore original display states
    cards.forEach((card, i) => card.style.display = states[i]);
  }

  // Initialize and handle window resizing
  setTimeout(lockGridHeight, 100);
  window.addEventListener("resize", lockGridHeight);

  filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      // Ignore if clicking the already active button
      if (btn.classList.contains("active")) return;

      /* active button */
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const gridRect = toolboxGrid.getBoundingClientRect();

      // FIRST: Record initial bounding rects
      const firstRects = new Map();
      cards.forEach(card => {
        firstRects.set(card, card.getBoundingClientRect());
        // Reset transitions so we can snap or prepare them
        card.style.transition = 'none';
      });

      // EXECUTE: Apply DOM changes
      cards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === "all" || category === filter) {
          // Being shown
          card.style.display = "block";
          card.classList.remove("hide");
          card.classList.add("show");
          // Clear any absolute positioning so it rejoins the CSS Grid flow
          card.style.position = '';
          card.style.top = '';
          card.style.left = '';
          card.style.width = '';
          card.style.height = '';
          card.style.transform = ''; // reset any previous translate
        } else {
          // Being hidden
          const rect = firstRects.get(card);
          // Only lock it if it was previously visible
          if (!card.classList.contains("hide")) {
            card.style.width = rect.width + 'px';
            card.style.height = rect.height + 'px';
            card.style.position = 'absolute';
            card.style.top = (rect.top - gridRect.top) + 'px';
            card.style.left = (rect.left - gridRect.left) + 'px';
            // Start at scale 1 before the CSS transitions it to scale 0.8
            card.style.transform = 'scale(1)'; 
          }
          
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });

      // LAST: Record new bounding rects for visible cards and INVERT
      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === "all" || category === filter) {
          const first = firstRects.get(card);
          const last = card.getBoundingClientRect();

          const deltaX = first.left - last.left;
          const deltaY = first.top - last.top;

          // If the card actually moved, invert it back to its starting position
          if (deltaX !== 0 || deltaY !== 0) {
            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          }
        }
      });

      // PLAY: Animate to final state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cards.forEach(card => {
            const category = card.dataset.category;
            
            // Re-enable smooth CSS transitions
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
            
            if (filter === "all" || category === filter) {
              // Visible cards slide into their natural grid position
              card.style.transform = 'translate(0, 0) scale(1)';
            } else {
              // Hidden cards stay where they are and fade/shrink out
              card.style.transform = 'scale(0.8)';
            }
          });
        });
      });

      // Cleanup hidden cards after animation completes
      setTimeout(() => {
        cards.forEach(card => {
          if (card.classList.contains("hide")) {
            card.style.display = "none";
          }
        });
      }, 500); // match transition duration

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
