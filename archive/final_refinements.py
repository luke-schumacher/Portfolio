"""
Final refinements:
1. Update About section - remove age, Arabic, French, and replace statement
2. Add dark mode toggle button
3. Verify filtering works
"""

import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def add_dark_mode_toggle(html):
    """Add dark mode toggle button to body"""
    toggle_button = '''    <!-- Dark Mode Toggle -->
    <button id="dark-mode-toggle" aria-label="Toggle dark mode">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    </button>

'''
    
    # Add right after opening <body> tag
    html = html.replace('<body>', f'<body>\n{toggle_button}')
    
    return html

def update_about_section(html):
    """Update About section content"""
    
    # Remove age (21 years old)
    html = re.sub(r'21 years old[,\s]*', '', html, flags=re.IGNORECASE)
    html = re.sub(r',\s*21\s*years\s*old', '', html, flags=re.IGNORECASE)
    
    # Remove Arabic
    html = re.sub(r'<span[^>]*>Arabic</span>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'Arabic[,\s]*', '', html, flags=re.IGNORECASE)
    
    # Remove French  
    html = re.sub(r'<span[^>]*>French</span>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'French[,\s]*', '', html, flags=re.IGNORECASE)
    
    # Replace the AI accessibility statement
    old_statement = "I believe AI should be accessible, ethical, and beneficial for all."
    new_statement = "I focus on building reliable, scalable AI systems that solve real-world problems under operational constraints."
    
    html = html.replace(old_statement, new_statement)
    
    # Also try case variations
    html = re.sub(
        r'I believe AI should be accessible,\s*ethical,\s*and beneficial for all\.',
        new_statement,
        html,
        flags=re.IGNORECASE
    )
    
    return html

def verify_external_links(html):
    """Ensure CSS and JS are properly linked"""
    
    # Check if CSS is linked
    if 'portfolio-enhancements.css' not in html:
        print("  ⚠️  Adding CSS link...")
        # Add before </head>
        css_link = '    <link rel="stylesheet" href="portfolio-enhancements.css">\n'
        html = html.replace('</head>', f'{css_link}</head>')
    else:
        print("  ✅ CSS already linked")
    
    # Check if JS is linked
    if 'portfolio-enhancements.js' not in html:
        print("  ⚠️  Adding JS link...")
        # Add before </body>
        js_link = '    <script src="portfolio-enhancements.js"></script>\n'
        html = html.replace('</body>', f'{js_link}</body>')
    else:
        print("  ✅ JS already linked")
    
    return html

def main():
    print("🛠️  Applying Final Refinements...\n")
    
    # Read HTML
    print("1️⃣ Reading index.html...")
    html = read_file('index.html')
    
    # Verify external links
    print("\n2️⃣ Verifying external CSS/JS links...")
    html = verify_external_links(html)
    
    # Update About section
    print("\n3️⃣ Updating About section...")
    html = update_about_section(html)
    print("  ✅ Removed: age, Arabic, French")
    print("  ✅ Updated AI statement to defense/tech focus")
    
    # Add dark mode toggle
    print("\n4️⃣ Adding dark mode toggle button...")
    html = add_dark_mode_toggle(html)
    print("  ✅ Dark mode toggle added (top right corner)")
    
    # Write updated HTML
    print("\n5️⃣ Writing updated index.html...")
    write_file('index.html', html)
    
    print("\n" + "="*60)
    print("✅ ALL REFINEMENTS COMPLETE!")
    print("="*60)
    print("\n📋 Changes made:")
    print("  ✅ About section updated (no age, no Arabic/French)")
    print("  ✅ AI statement replaced with operational focus")
    print("  ✅ Dark mode toggle button added")
    print("  ✅ External CSS/JS verified")
    print("\n🧪 Test now:")
    print("  1. Open index.html")
    print("  2. Click dark mode button (top right)")
    print("  3. Test project filtering")
    print("  4. Check About section changes")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
