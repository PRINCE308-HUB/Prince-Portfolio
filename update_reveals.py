import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove reveal-hidden from sections
html = html.replace('<section id="about" class="pt-32 reveal-hidden">', '<section id="about" class="pt-32">')
html = html.replace('<section id="skills" class="pt-32 reveal-hidden">', '<section id="skills" class="pt-32">')
html = html.replace('<section id="projects" class="pt-32 pb-20 reveal-hidden">', '<section id="projects" class="pt-32 pb-20">')
html = html.replace('<section id="contact" class="pt-32 pb-24 reveal-hidden">', '<section id="contact" class="pt-32 pb-24">')

# 2. Add to About Me children
html = html.replace('<h2 class="text-5xl font-bold mb-10 text-white">About Me</h2>', '<h2 class="text-5xl font-bold mb-10 text-white reveal-hidden">About Me</h2>')
html = html.replace('<div class="space-y-6 text-gray-300 text-lg">', '<div class="space-y-6 text-gray-300 text-lg reveal-hidden delay-100">')

# We need to replace the 4 about-boxes uniquely to add staggered delays.
# They are identical in class, so we will use replace with a counter or just finditer.
parts = html.split('<div class="about-box">')
if len(parts) == 5: # Means there were 4 occurrences
    html = parts[0] + '<div class="about-box reveal-hidden delay-200">' + parts[1] + '<div class="about-box reveal-hidden delay-300">' + parts[2] + '<div class="about-box reveal-hidden delay-400">' + parts[3] + '<div class="about-box reveal-hidden delay-500">' + parts[4]

# 3. Add to inner wrappers for the rest of the sections so padding doesn't trigger it early.
# Toolbox:
# <section id="skills" class="pt-32">
#   <div class="max-w-7xl mx-auto px-6">
# We can replace the heading and content or just the wrapper. 
# Let's add it to the heading and the grid to stagger them slightly too for premium feel.
html = html.replace('<h2 class="text-5xl font-bold text-white mb-12">\n      My Toolbox\n    </h2>', '<h2 class="text-5xl font-bold text-white mb-12 reveal-hidden">\n      My Toolbox\n    </h2>')
html = html.replace('<div class="flex gap-6 mb-10">', '<div class="flex gap-6 mb-10 reveal-hidden delay-100">')
html = html.replace('<div id="toolbox-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 content-start relative">', '<div id="toolbox-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 content-start relative reveal-hidden delay-200">')

# Projects:
html = html.replace('<h2 class="text-5xl font-bold text-white mb-12">\n      Projects\n    </h2>', '<h2 class="text-5xl font-bold text-white mb-12 reveal-hidden">\n      Projects\n    </h2>')
html = html.replace('<div class="tool-card project-card reveal p-8 text-left">', '<div class="tool-card project-card reveal p-8 text-left reveal-hidden delay-100">')

# Contact:
html = html.replace('<h2 class="text-5xl font-bold text-white mb-12">\n      Contact Me\n    </h2>', '<h2 class="text-5xl font-bold text-white mb-12 reveal-hidden">\n      Contact Me\n    </h2>')
html = html.replace('<div class="grid md:grid-cols-3 gap-8">', '<div class="grid md:grid-cols-3 gap-8 reveal-hidden delay-100">')


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("done")
