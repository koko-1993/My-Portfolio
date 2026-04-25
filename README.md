# 🚀 Ko Ko — Personal Portfolio

A modern, dark-themed personal portfolio website showcasing my skills, projects, and professional experience as an **IT Support Officer** at ILBC and **Web Developer**.

> **Live Preview**: Open `index.html` in any modern browser.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌙 **Dark Theme** | Deep navy base with cyan/purple/pink gradient accents |
| 🪟 **Glassmorphism** | Frosted glass card effects throughout |
| ✨ **Particle Background** | Interactive animated dots that react to mouse movement |
| ⌨️ **Typewriter Effect** | Cycling role titles in the hero section |
| 📜 **Scroll Animations** | Sections fade in smoothly as you scroll |
| 📊 **Animated Skill Bars** | Fill up when they enter the viewport |
| 🔢 **Counter Animation** | Stat numbers count up when visible |
| 🔍 **Project Filters** | Filter projects by category (All / Web App / Bot / Mobile) |
| 📱 **Fully Responsive** | Mobile hamburger menu, stacked layouts for all screen sizes |
| 📥 **CV Download** | One-click CV download button in the hero section |
| 📬 **Contact Form** | Validated form with animated submit feedback |
| ⬆️ **Back to Top** | Floating button appears on scroll |

---

## 📁 Project Structure

```
My Portfolio/
├── index.html              # Main single-page HTML
├── README.md               # This file
├── css/
│   ├── style.css           # Design system, layout, responsive styles
│   └── animations.css      # Keyframe animations & micro-interactions
├── js/
│   ├── main.js             # Navigation, scroll effects, filters, form
│   ├── typewriter.js       # Hero typewriter text animation
│   └── particles.js        # Interactive particle canvas background
└── assets/
    ├── Ko_Ko_CV.pdf         # CV file for download (upload your own)
    └── images/
        └── profile.jpg     # Profile photo
```

---

## 🗂️ Sections

### 1. Navigation Bar
- Fixed transparent navbar with blur backdrop on scroll
- 🚀 **My Portfolio** logo with gradient icon
- Smooth scroll to sections with active link highlighting
- Mobile hamburger menu with slide-in animation

### 2. Hero Section
- Greeting with animated wave emoji
- **Ko Ko** gradient name display
- Typewriter cycling: `IT Support Officer` → `Web Developer` → `Tech Enthusiast` → `Problem Solver`
- CTA buttons: **View My Work** / **Contact Me**
- Social links: GitHub, Email, **CV Download**
- Floating profile photo with gradient glow ring

### 3. About Me
- Profile photo with glassmorphism card and pulse glow
- Bio in Myanmar language describing ILBC role and coding passion
- Animated stat counters: **14+ Projects** | **2+ Years** | **15+ Technologies**

### 4. Skills
Three categorized skill groups with animated progress bars:

| Frontend | Backend | IT Support & Tools |
|----------|---------|-------------------|
| HTML5 (95%) | Node.js (80%) | Git/GitHub (85%) |
| CSS3 (90%) | Python (75%) | Networking (88%) |
| JavaScript (88%) | Dart/Flutter (70%) | Linux (80%) |
| React (85%) | MongoDB (72%) | IT Support (90%) |

### 5. Projects
Four real GitHub projects with filterable categories:

| Project | Category | Tech Stack |
|---------|----------|------------|
| [IT Service Chat Bot](https://github.com/koko-1993/IT_Service_Chat_Bot) | Bot/AI | Python, AI |
| [POS Management System](https://github.com/koko-1993/POS_Management_System) | Mobile | Dart, Flutter |
| [Group Chat Room](https://github.com/koko-1993/groupchatroom) | Web App | Node.js, Express, WebSocket |
| [Student Management](https://github.com/koko-1993/Student_Management) | Web App | HTML, CSS, JavaScript |

### 6. Experience Timeline
- **IT Support Officer** — ILBC (Present)
- **Web Developer** — Personal Projects & Open Source (Ongoing)
- **Self-Taught Developer** — Online Learning & Practice

### 7. Contact
- Email: koko2652010@gmail.com
- Location: Myanmar
- GitHub: [github.com/koko-1993](https://github.com/koko-1993)
- Contact form with validation and animated submit

### 8. Footer
- Quick navigation links
- Copyright notice

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks, pure ES6+
- **Google Fonts** — Inter + Space Grotesk
- **Font Awesome 6** — Icons
- **Canvas API** — Particle background animation

---

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in your browser — no build step needed!
3. **Customize** your content:
   - Edit `index.html` to update text, links, and projects
   - Replace `assets/images/profile.jpg` with your photo
   - Add your CV as `assets/Ko_Ko_CV.pdf`

---

## 📝 Customization Guide

### Change Profile Info
Edit these in `index.html`:
- **Name**: Search for `Ko Ko` and replace
- **Bio**: Update the `<p>` tags in the About section
- **Email**: Search for `koko2652010@gmail.com`
- **GitHub**: Search for `koko-1993`

### Change Typewriter Roles
Edit `js/typewriter.js` → `words` array:
```javascript
const words = [
  'IT Support Officer',
  'Web Developer',
  'Tech Enthusiast',
  'Problem Solver'
];
```

### Add/Remove Projects
Copy a `<div class="project-card">` block in the Projects section and update the content.

### Upload CV
Place your CV file at `assets/Ko_Ko_CV.pdf` — the download button will work automatically.

---

## 📄 License

© 2026 Ko Ko. All rights reserved.

---

## 📧 Contact

- **Email**: koko2652010@gmail.com
- **GitHub**: [github.com/koko-1993](https://github.com/koko-1993)
