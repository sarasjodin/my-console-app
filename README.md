# My retro C# Console app
[Open Live Demo](https://my-console-app.netlify.app)
<br><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/d69d10f5-a057-403c-a1d0-b96b503c90c2/deploy-status)](https://app.netlify.com/projects/my-console-app/deploys)

<img width="auto" height="auto" alt="Home page of my console application" src="https://github.com/user-attachments/assets/f0e17bb3-aad3-4beb-841f-e8462c6ff69c" />

---

## About This Project
This project is a **web application** that embeds and runs simple **C# console applications** directly in the browser.  
The first demo app calculates the **day of the week** for a given date using **Zeller’s algorithm**.  

Purpose:  
- Showcase and test C# console apps in a safe, sandboxed environment  
- Experiment with embedding external runners (e.g., Try .NET Fiddle)  
- Serve as a learning project focusing on **security, accessibility, and minimal design**  

---

## Features
- ✅ Embed and run C# console apps in-browser (via iframe, sandboxed)  
- ✅ Day-of-week calculator (Zeller’s algorithm)  
- 🔍 Focus on **security, accessibility, and modular design**  

---

## Tech Stack
- HTML / CSS / JavaScript (Vite as build tool)  
- Netlify (static hosting & deployment)  
- External sandbox runners: **.NET Fiddle** (for C#)  
- Planned: JupyterLite or Pyodide (for Python integration in the future)  

---

## Installation
Clone the repo and install dependencies:

```bash
npm install
npm run dev
```

## Folder Structure

<img width="150" height="770" alt="folder structure" src="https://github.com/user-attachments/assets/eb878a9f-fbf9-41ce-8d4d-a24cc47e16cc" />


---

## Security

- ✅ Dependabot active for keeping dependencies updated
- ✅ Security policy configured
- ✅ Strict Content-Security-Policy (CSP) with sandboxed iframes

---

## License

MIT – see LICENSE.md for details.

---
