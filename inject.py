import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Canvas
html = html.replace('<canvas id="nebula-canvas" class="fixed inset-0 -z-20 bg-black"></canvas>', '<canvas id="nebula-canvas" class="fixed inset-0 -z-20 bg-black opacity-0 transition-opacity duration-1000 ease-in-out"></canvas>')

# Navbar
html = html.replace('<header id="navbar" class="fixed top-0 left-0 w-full z-50 px-4 pt-6 transition-all duration-300">', '<header id="navbar" class="fixed top-0 left-0 w-full z-50 px-4 pt-6 transition-all duration-300 load-hidden delay-100">')

# Top Subtitle
html = html.replace('<p class="tracking-[0.3em] uppercase text-sm text-gray-300 font-medium mb-4">', '<p class="tracking-[0.3em] uppercase text-sm text-gray-300 font-medium mb-4 load-hidden delay-200">')

# Main Title
html = html.replace('<h1 class="text-5xl md:text-[5.5rem] font-semibold mb-6 tracking-tight text-white">', '<h1 class="text-5xl md:text-[5.5rem] font-semibold mb-6 tracking-tight text-white load-hidden delay-300">')

# Bottom Subtitle
html = html.replace('<p class="tracking-[0.2em] uppercase text-xs md:text-sm text-gray-400 mb-12">', '<p class="tracking-[0.2em] uppercase text-xs md:text-sm text-gray-400 mb-12 load-hidden delay-400">')

# Button
html = html.replace('<a href="#about" class="px-8 py-3 rounded-lg border border-orange-500/50 text-gray-300 hover:border-orange-500 hover:text-white transition duration-300 flex items-center gap-3 text-sm tracking-widest font-medium">', '<a href="#about" class="px-8 py-3 rounded-lg border border-orange-500/50 text-gray-300 hover:border-orange-500 hover:text-white transition duration-300 flex items-center gap-3 text-sm tracking-widest font-medium load-hidden delay-500">')

# Scroll Indicator
html = html.replace('<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'})">', '<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition load-hidden delay-600" onclick="document.getElementById(\'about\').scrollIntoView({behavior: \'smooth\'})">')

# About section
html = html.replace('<section id="about" class="pt-32">', '<section id="about" class="pt-32 reveal-hidden">')

# Skills section
html = html.replace('<section id="skills" class="pt-32">', '<section id="skills" class="pt-32 reveal-hidden">')

# Projects section
if '<section id="projects" class="pt-32 pb-20">' in html:
    html = html.replace('<section id="projects" class="pt-32 pb-20">', '<section id="projects" class="pt-32 pb-20 reveal-hidden">')
elif '<section id="projects" class="pt-32">' in html:
    html = html.replace('<section id="projects" class="pt-32">', '<section id="projects" class="pt-32 reveal-hidden">')

# Contact section
html = html.replace('<section id="contact" class="pt-32 pb-24">', '<section id="contact" class="pt-32 pb-24 reveal-hidden">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("done")
