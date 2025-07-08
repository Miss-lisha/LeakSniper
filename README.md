# LeakSniper
![GitHub last commit](https://img.shields.io/github/last-commit/Miss-lisha/LeakSniper)
![Repo size](https://img.shields.io/github/repo-size/Miss-lisha/LeakSniper)
![License](https://img.shields.io/badge/license-Educational-blue)

## 📚 Table of Contents

- [Use Case](#-use-case)
- [Features](#️-features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [License](#-license)
- [Project Insight](#-project-insight)
- [About the Creator](#-about-the-creator)
- [Connect with Me](#-connect-with-me)




**LeakSniper** is a secure, browser-based breach awareness tool designed to check whether an email address or phone number has been involved in publicly available data leaks—specifically the MOAB (Mother of All Breaches) dataset.

This project was developed as part of my personal learning journey in cybersecurity and ethical software design. It reflects my growing skills in secure frontend engineering, data privacy awareness, and responsive UI development using modern frameworks.

---

## 🔍 Use Case

With the rising number of breach incidents, tools like LeakSniper offer individuals a simple way to check potential exposure—**without sending any data to a server**. All logic runs in-browser, preserving user privacy.

> ⚠️ This project is intended for **educational and ethical use only**.  
> Do not use it to scan real or third-party data without full consent.

---

## ⚙️ Features

- Email and phone input scanning
- No backend — everything runs locally in the browser
- Sanitized input with DOMPurify to prevent injection/XSS
- html2canvas integration for exportable UI evidence
- Built with React + Vite + TypeScript
- Styled with TailwindCSS (responsive & clean)

---

## Live Demo

[Try LeakSniper Online](https://leaksniper.vercel.app)  

---

## Tech Stack

| Layer         | Tools                            |
|---------------|----------------------------------|
| Frontend      | React, Vite, TypeScript          |
| Styling       | TailwindCSS                      |
| Input Safety  | DOMPurify                        |
| UI Capture    | html2canvas                      |
| Linting       | ESLint (React + Hooks)           |

---

## Getting Started

To run LeakSniper locally, clone the repo and start the development server:

```bash
git clone https://github.com/Miss-lisha/LeakSniper.git
cd LeakSniper
npm install
npm run dev
```

---

## 📜 License

This project is licensed for non-commercial, educational use only.  
See [`LICENSE.md`](LICENSE.md) for full terms.

---

## 🧠 Project Insight

LeakSniper was initially prototyped using Bolt AI, where I designed custom prompts to shape the functionality and logic. I then used ChatGPT to better understand frontend security practices and web vulnerabilities, refining the app step-by-step using my own logic and insights.

The final version was independently engineered using React, TypeScript, Vite, TailwindCSS, DOMPurify, and html2canvas. It emphasizes privacy-first, client-side logic, and reflects my deep interest in the intersection of AI-assisted development and cybersecurity.

---


## 👩‍💻 About the Creator


**Alisha**
BSc Graduate | Aspiring Cybersecurity & AI Professional  

I’m passionate about building solutions that merge digital safety with intelligent design. With a strong foundation in ethical computing and modern web technologies, I aim to develop tools that protect user privacy, promote data security, and leverage AI responsibly.  
LeakSniper reflects my curiosity-driven learning, hands-on problem solving, and commitment to building in public as I grow in the cybersecurity and AI space.

## 🤝 Connect with Me
- [LinkedIn](https://www.linkedin.com/in/alisha-chaudhary-/)
- [GitHub](https://github.com/Miss-lisha)
- [Email](mailto:bluxbxllalisha@gmail.com)

---