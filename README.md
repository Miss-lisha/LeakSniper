# LeakSniper

**LeakSniper** is a secure, browser-based breach awareness tool designed to check whether an email address or phone number has been involved in publicly available data leaks—specifically the MOAB (Mother of All Breaches) dataset.

This project was developed as part of my personal learning journey in cybersecurity and ethical software design. It reflects my growing skills in secure frontend engineering, data privacy awareness, and responsive UI development using modern frameworks.

---

## 🔍 Use Case

With the rising number of breach incidents, tools like LeakSniper offer individuals a simple way to check potential exposure—**without sending any data to a server**. All logic runs in-browser, preserving user privacy.

> ⚠️ This project is intended for **educational and ethical use only**.  
> Do not use it to scan real or third-party data without full consent.

---

## Features

- Email and phone input scanning
- No backend — everything runs locally in the browser
- Sanitized input with DOMPurify to prevent injection/XSS
- html2canvas integration for exportable UI evidence
- Built with React + Vite + TypeScript
- Styled with TailwindCSS (responsive & clean)

---

## Demo

![LeakSniper Demo](assets/demo.gif)

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

```bash
git clone https://github.com/Miss-lisha/LeakSniper.git
cd LeakSniper
npm install
npm run dev
