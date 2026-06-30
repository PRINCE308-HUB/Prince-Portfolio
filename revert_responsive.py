import os

def revert_file():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Navbar
    html = html.replace(
        '<ul id="main-nav" class="hidden md:flex space-y-4 md:space-y-0 md:space-x-12 text-xs tracking-widest font-medium absolute md:static top-full left-0 w-full md:w-auto bg-black/95 backdrop-blur-xl md:bg-transparent flex-col md:flex-row items-center p-6 md:p-0 rounded-2xl md:rounded-none border border-gray-800 md:border-none mt-4 md:mt-0 shadow-2xl md:shadow-none animate-fade-in-down origin-top">',
        '<ul id="main-nav" class="hidden md:flex space-x-12 text-xs tracking-widest font-medium absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row items-center p-6 md:p-0 rounded-2xl md:rounded-none border border-gray-800 md:border-none mt-4 md:mt-0">'
    )

    # 2. Hero
    html = html.replace(
        '<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-semibold mb-6 tracking-tight text-white load-hidden delay-300 leading-tight">',
        '<h1 class="text-5xl md:text-[5.5rem] font-semibold mb-6 tracking-tight text-white load-hidden delay-300">'
    )
    html = html.replace(
        '<p class="tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs md:text-sm text-gray-400 mb-12 load-hidden delay-400 text-center px-4 leading-relaxed">',
        '<p class="tracking-[0.2em] uppercase text-xs md:text-sm text-gray-400 mb-12 load-hidden delay-400">'
    )
    
    # Hero Headings (section titles)
    html = html.replace('text-4xl md:text-5xl font-bold', 'text-5xl font-bold')
    
    # 3. About Grid
    html = html.replace(
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">',
        '<div class="grid grid-cols-2 gap-8">'
    )

    # 4. Toolbox Filtering
    html = html.replace(
        '<div class="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 reveal-hidden delay-100">',
        '<div class="flex gap-6 mb-10 reveal-hidden delay-100">'
    )

    # 5. Projects
    html = html.replace(
        '<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">',
        '<div class="flex gap-4">'
    )
    html = html.replace(
        'class="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:scale-105 transition duration-300 w-full sm:w-auto text-center">',
        'class="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:scale-105 transition duration-300">'
    )
    html = html.replace(
        'class="px-5 py-2 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-black transition duration-300 w-full sm:w-auto text-center">',
        'class="px-5 py-2 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-black transition duration-300">'
    )

    # 6. Contact
    html = html.replace(
        '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 reveal-hidden delay-100">',
        '<div class="grid md:grid-cols-3 gap-8 reveal-hidden delay-100">'
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("HTML reverted.")

    # 7. Update script.js to remove navbar toggle
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
        
    nav_js = """
/* ================= MOBILE NAVBAR ================= */
const menuBtn = document.getElementById('mobile-menu-button');
const navMenu = document.getElementById('main-nav');
const navLinksMobile = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('flex');
    
    // Toggle icon between bars and times
    const icon = menuBtn.querySelector('i');
    if (navMenu.classList.contains('flex')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
});

/* ================= ACTIVE NAVBAR ================= */
"""
    if 'MOBILE NAVBAR' in js:
        js = js.replace(nav_js, '/* ================= ACTIVE NAVBAR ================= */\n')
        with open('script.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("JS reverted.")
    
    # 8. Remove fade-in-down animation from Tailwind config/CSS
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()
        
    anim_css = """
/* Mobile Menu Animation */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
"""
    if anim_css in css:
        css = css.replace(anim_css, '')
        with open('style.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print("CSS reverted.")

if __name__ == "__main__":
    revert_file()
