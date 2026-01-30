# Luke Schumacher - Portfolio

> AI/ML Engineer specializing in multi-agent systems, predictive modeling, and production-grade machine learning for critical applications.

**Live Site:** [https://luke-schumacher.github.io/Portfolio/](https://luke-schumacher.github.io/Portfolio/)

---

## 🎯 Overview

Personal portfolio website showcasing professional AI/ML engineering projects with emphasis on:
- Multi-agent system architectures
- Production ML deployment
- Healthcare & infrastructure applications
- Systems thinking and scalability
- Real-world operational constraints

**Target Audience:** Defense, aerospace, and advanced technology companies seeking experienced ML engineers with production deployment experience.

---

## ✨ Features

### Interactive Project Filtering
- **5 Categories:** All Projects, Healthcare AI, AI Systems/Infrastructure, Civic Tech, Game Development
- Smooth animations and transitions
- Real-time filtering with active state management

### Detailed Case Studies
- **5 In-Depth Modals** (~500 words each)
- Hidden until "Read More" clicked
- Technical architecture details
- Challenges, solutions, and trade-offs
- Defense/aerospace relevance

### Dark Mode
- Toggle button (top right)
- Theme persistence via localStorage
- Fully styled dark theme for all sections

### Functional Contact Form
- Integrated with Formspree
- Email notifications
- Form validation

### 13 Featured Projects
Including award-winning systems from:
- Siemens Healthineers (🏆 ITT Summit Award 2023)
- Master's thesis research (Multi-agent RAG system)
- Hackathon wins (🏆 Finastra Hack to the Future 2020)
- Academic projects (AISS Prompt Academy)

---

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - Interactive features

### External Services
- **Formspree** - Contact form backend
- **GitHub Pages** - Static site hosting
- **Google Fonts** - Typography (Inter)

### Custom Components
- `portfolio-enhancements.css` - Filter buttons, modals, dark mode
- `portfolio-enhancements.js` - Filtering logic, modal system, theme toggle

---

## 📂 Project Structure

```
Portfolio/
├── index.html                      # Main portfolio page
├── portfolio-enhancements.css      # Custom styles
├── portfolio-enhancements.js       # Interactive functionality
├── assests/
│   └── Images/                     # Project screenshots & profile images
├── archive/                        # Development files & backups
├── CV_Luke_Schumacher.pdf          # Resume download
└── README.md                       # This file
```

---

## 🚀 Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Git (for cloning)

### Setup

```bash
# Clone the repository
git clone https://github.com/luke-schumacher/Portfolio.git

# Navigate to directory
cd Portfolio

# Open in browser
# (Windows)
start index.html

# (Mac)
open index.html

# (Linux)
xdg-open index.html
```

No build process required - it's a static site!

---

## 🧪 Testing

### Manual Testing Checklist

**Dark Mode:**
- [ ] Click moon icon (top right)
- [ ] Verify theme switches
- [ ] Refresh page - theme persists
- [ ] All sections properly styled

**Filtering:**
- [ ] Click "Healthcare AI" → Shows 2 projects
- [ ] Click "AI Systems / Infrastructure" → Shows ~6 projects
- [ ] Click "All Projects" → Shows all 13

**Modals:**
- [ ] Click "Read More" buttons
- [ ] Verify content loads (~500 words)
- [ ] ESC key closes modal
- [ ] Overlay click closes modal

**Contact Form:**
- [ ] Fill all fields
- [ ] Submit form
- [ ] Verify Formspree processes submission

**Responsive Design:**
- [ ] Test on mobile (Chrome DevTools)
- [ ] Test on tablet size
- [ ] Verify navigation works on small screens

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🎨 Design Philosophy

### Positioning
Targets **defense, aerospace, and advanced technology** recruiters by emphasizing:
- Systems-level thinking
- Production ML experience
- Operational constraints & trade-offs
- Technical depth without jargon

### User Experience
- **Progressive disclosure:** Details hidden behind "Read More"
- **Non-overwhelming:** 500-word max case studies
- **Accessible:** Dark mode, semantic HTML
- **Fast:** Lightweight, optimized images

---

## 📊 Featured Projects

### 1. Customer Digital Twin (Siemens Healthineers) 🏆
- CVAE architecture for synthetic customer profiling
- GDPR/HIPAA compliant
- Production deployment (<200ms inference)
- **Award:** First Place, ITT Summit Award 2023

### 2. Agentic Infrastructure Co-Pilot (Master's Thesis)
- Multi-agent RAG system with Neo4j knowledge graph
- 3 specialized agents + coordinator
- Dempster-Shafer voting mechanism
- Mean Time to Innocence (MTTI) evaluation

### 3. Prompt Academy (AISS Project)
- Agent-based educational platform
- LLM integration (Llama-3.1-70B)
- Adversarial robustness design
- Deployed on Netlify

### 4. MRI Scheduling AI (Siemens)
- Custom Transformer architecture
- 89% prediction accuracy
- <50ms latency requirement
- Production Kubernetes deployment

### 5. ESG Dashboard (Hackathon) 🏆
- Automated sentiment analysis (50K+ articles/day)
- Node2Vec graph embeddings
- **Award:** Best Environmental Impact & UX

*...and 8 more projects showcasing AI/ML, game development, and civic tech.*

---

## 📧 Contact

- **Website:** [https://luke-schumacher.github.io/Portfolio/](https://luke-schumacher.github.io/Portfolio/)
- **GitHub:** [@luke-schumacher](https://github.com/luke-schumacher)
- **LinkedIn:** [Luke Schumacher](https://www.linkedin.com/in/luke-schumacher-611468130/)
- **Email:** Via contact form on portfolio site

---

## 📄 License

This portfolio website is © 2024 Luke Schumacher. All rights reserved.

Project code and content are for demonstration purposes. Individual projects may have separate licenses - see respective repositories.

---

## 🙏 Acknowledgments

- **Siemens Healthineers** - Digital Twin & MRI Scheduling projects
- **AISS (AI in Society and Science)** - Prompt Academy project
- **Finastra** - ESG Dashboard hackathon
- **Technical advisors** - Multi-agent system thesis guidance

---

## 📝 Version History

### v2.0 (2026-01-30) - Defense/Tech Positioning
- ✅ Added project filtering system (5 categories)
- ✅ Added 5 detailed case study modals
- ✅ Integrated dark mode toggle
- ✅ Added Prompt Academy project
- ✅ Formspree contact form integration
- ✅ Repositioned messaging for defense/aerospace audience
- ✅ Updated About section (operational focus)

### v1.0 (2024) - Initial Launch
- Basic portfolio with 12 projects
- Static project cards
- Contact section (non-functional)
- Responsive design

---

**Last Updated:** January 30, 2026  
**Status:** Production-Ready ✅
