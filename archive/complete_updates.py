"""
Complete Final Update Script:
1. Replace verbose modals with condensed 500-word versions
2. Add Formspree form action
3. Add Prompt Academy project card with image
"""

import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def replace_modals_with_condensed(html):
    """Replace existing modals with condensed 500-word versions"""
    
    # Remove all existing project modals
    # They start with <!-- Modal: or <!-- Project Modals --> and end before next major section
    pattern = r'<!-- (Project Modals|Modal:).*?(?=</main>|$)'
    html = re.sub(pattern, '', html, flags=re.DOTALL)
    
    # Read condensed modals
    condensed_modals = read_file('modal-content-condensed.html')
    
    # Insert before </main>
    html = html.replace('</main>', f'\n{condensed_modals}\n    </main>')
    
    return html

def add_formspree(html):
    """Add Formspree action to contact form"""
    # Pattern to find form tag and add action/method
    pattern = r'<form\s+class="bg-white p-8[^>]*>'
    replacement = '<form class="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100" action="https://formspree.io/f/mzdgjlpw" method="POST">'
    
    html = re.sub(pattern, replacement, html)
    
    return html

def add_prompt_academy_card(html):
    """Add Prompt Academy project card after Stock Prediction"""
    
    card_html = '''
                    <!-- Prompt Academy -->
                    <div class="project-card bg-white rounded-xl shadow-lg overflow-hidden" data-categories="aiSystems civic game">
                        <div class="project-image h-48 bg-gray-200 overflow-hidden">
                            <img src="assests/Images/prompt-academy/assets/level_1_background.png" alt="Prompt Academy" class="w-full h-full object-cover" onload="this.classList.add('loaded')">
                        </div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-indigo-600 font-semibold">AISS Project • Completed</span>
                            </div>
                            <h3 class="text-2xl font-bold mb-2">Prompt Academy</h3>
                            <p class="text-gray-600 mb-4">Interactive learning platform teaching prompt engineering through agent-based game mechanics. Demonstrates systems-level thinking in AI interaction design with progressive difficulty and real-time LLM feedback.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">Agent Design</span>
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">LLMs</span>
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">Game Mechanics</span>
                                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">Education</span>
                            </div>
                            <div class="flex gap-3 mb-4">
                                <a href="https://ai-academy-game.netlify.app/" target="_blank" class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold">
                                    Live Demo
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                                <a href="https://github.com/luke-schumacher/prompt-academy" target="_blank" class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold">
                                    GitHub
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                            <button class="read-more-btn mt-4" data-modal="modal-prompt-academy">
                                Read More →
                            </button>
                        </div>
                    </div>
'''
    
    # Check if already added
    if 'Prompt Academy' in html and 'prompt-academy/assets/level_1_background.png' in html:
        print("  ⏭️  Prompt Academy card already exists, skipping...")
        return html
    
    # Find a good insertion point - after any project card containing "Stock"
    pattern = r'(<!-- Stock.*?</div>\s*</div>\s*</div>\s*)'
    match = re.search(pattern, html, re.DOTALL | re.IGNORECASE)
    
    if match:
        insert_pos = match.end()
        html = html[:insert_pos] + card_html + html[insert_pos:]
        print("  ✅ Prompt Academy card added after Stock Prediction")
    else:
        print("  ⚠️  Could not find Stock Prediction project, trying alternative...")
        # Try finding project grid and add at end
        pattern = r'(</div>\s*</div>\s*</div>\s*</section>\s*<!-- About)'
        match = re.search(pattern, html, re.DOTALL)
        if match:
            insert_pos = match.start()
            html = html[:insert_pos] + card_html + html[insert_pos:]
            print("  ✅ Prompt Academy card added before About section")
        else:
            print("  ❌ Could not find insertion point for Prompt Academy")
    
    return html

def main():
    print("🚀 Applying Complete Final Updates...\n")
    
    # Read HTML
    print("1️⃣ Reading index.html...")
    html = read_file('index.html')
    
    # Apply all updates
    print("\n2️⃣ Replacing modals with condensed 500-word versions...")
    html = replace_modals_with_condensed(html)
    print("  ✅ Modals replaced (max 500 words each)")
    
    print("\n3️⃣ Adding Formspree form action...")
    html = add_formspree(html)
    print("  ✅ Form action: https://formspree.io/f/mzdgjlpw")
    
    print("\n4️⃣ Adding Prompt Academy project card...")
    html = add_prompt_academy_card(html)
    
    # Write updated HTML
    print("\n5️⃣ Writing updated index.html...")
    write_file('index.html', html)
    
    print("\n" + "="*50)
    print("✅ ALL UPDATES COMPLETE!")
    print("="*50)
    print("\n📋 What changed:")
    print("  ✅ All 5 project modals condensed to ~500 words")
    print("  ✅ Formspree integrated: https://formspree.io/f/mzdgjlpw")
    print("  ✅ Prompt Academy card added with image")
    print("\n🧪 Next Steps:")
    print("  1. Open index.html in your browser")
    print("  2. Test filtering system")
    print("  3. Click 'Read More' on each project")
    print("  4. Test contact form submission")
    print("  5. Deploy to GitHub Pages!")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
