"""
Portfolio Enhancement Script
Automatically applies critical HTML modifications
"""

import re
import sys

def read_file(filepath):
    """Read file with UTF-8 encoding"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write file with UTF-8 encoding"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def add_external_links(html):
    """Add CSS and JS links"""
    # Add CSS link after Google Fonts
    css_link = '<link rel="stylesheet" href="portfolio-enhancements.css">'
    html = html.replace(
        '</head>',
        f'    {css_link}\n</head>'
    )
    
    # Add JS link before closing body
    js_link = '<script src="portfolio-enhancements.js"></script>'
    html = html.replace(
        '</body>',
        f'    {js_link}\n</body>'
    )
    
    return html

def add_filter_buttons(html):
    """Add project filter buttons"""
    old_subtitle = '''<p class="text-xl text-gray-600 max-w-3xl mx-auto">From award-winning applications to cutting-edge
                        AI research with industry leaders</p>
                </div>'''
    
    new_subtitle = '''<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Production AI systems, multi-agent architectures, and applied machine learning</p>
                    
                    <!-- Project Filter -->
                    <div class="flex flex-wrap justify-center gap-3 mt-4">
                        <button class="filter-btn active px-6 py-2 rounded-full font-semibold transition-all" data-filter="all">All Projects</button>
                        <button class="filter-btn px-6 py-2 rounded-full font-semibold transition-all" data-filter="healthcare">Healthcare AI</button>
                        <button class="filter-btn px-6 py-2 rounded-full font-semibold transition-all" data-filter="aiSystems">AI Systems / Infrastructure</button>
                        <button class="filter-btn px-6 py-2 rounded-full font-semibold transition-all" data-filter="civic">Civic Tech</button>
                        <button class="filter-btn px-6 py-2 rounded-full font-semibold transition-all" data-filter="game">Game Development</button>
                    </div>
                </div>'''
    
    return html.replace(old_subtitle, new_subtitle)

def add_data_categories(html):
    """Add data-categories to project cards"""
    categories = {
        'ESG Dashboard': 'data-categories="civic aiSystems"',
        'Customer Digital Twin': 'data-categories="healthcare aiSystems"',
        'MRI Scheduling AI': 'data-categories="healthcare aiSystems"',
        'Civic AI Debator': 'data-categories="civic aiSystems"',
        'AI Behavior Lab': 'data-categories="civic game"',
        'Stock Prediction': 'data-categories="aiSystems"',
        'Civic AI Negotiator': 'data-categories="civic aiSystems"',
        'Agentic Infra Co-Pilot': 'data-categories="aiSystems"',
        'Illigo EV Platform': 'data-categories="aiSystems"',
        'Dynamic Weather App': 'data-categories="civic"',
        'VR Ski Training Game': 'data-categories="game"',
        'Accessible Puzzle Game': 'data-categories="game"'
    }
    
    # Find and update each project card
    for project, category in categories.items():
        # Pattern: find div with class="project-card" near the project title
        pattern = re.compile(
            r'(<div class="project-card[^"]*")(>[\s\S]*?' + re.escape(project) + r')',
            re.MULTILINE
        )
        html = pattern.sub(rf'\1 {category}\2', html)
    
    return html

def add_modals(html):
    """Insert modal content before </main>"""
    modal_content = read_file('modal-content.html')
    
    # Extract just the HTML block from the markdown file
    start = modal_content.find('```html') + 7
    end = modal_content.find('```', start)
    modals_html = modal_content[start:end].strip()
    
    # Insert before </main>
    html = html.replace('</main>', f'{modals_html}\n    </main>')
    
    return html

def main():
    print("🚀 Starting Portfolio Enhancement Script...\n")
    
    # Read original HTML
    print("📖 Reading index.html...")
    html = read_file('index.html')
    
    # Apply modifications
    print("➕ Adding external CSS/JS links...")
    html = add_external_links(html)
    
    print("🔘 Adding filter buttons...")
    html = add_filter_buttons(html)
    
    print("🏷️  Adding data categories to project cards...")
    html = add_data_categories(html)
    
    print("📝 Adding modal content...")
    html = add_modals(html)
    
    # Write updated HTML
    print("💾 Writing updated index.html...")
    write_file('index.html', html)
    
    print("\n✅ Portfolio enhancement complete!")
    print("\n📋 Next steps:")
    print("  1. Get Formspree form ID from your email")
    print("  2. Review modal-content.html for detailed project info")
    print("  3. Test filtering and modals in browser")
    print("  4. Add Prompt Academy project card manually (see implementation_manual.md)")
    print("  5. Add GitHub links to existing projects (see implementation_manual.md)")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Please check implementation_manual.md for manual instructions")
        sys.exit(1)
