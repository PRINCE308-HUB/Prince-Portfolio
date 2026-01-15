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
