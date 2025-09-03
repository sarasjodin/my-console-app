# My C# Console app
<a href="[My retro console app(https://my-console-app.netlify.app/)]" target="_blank" rel="noopener noreferrer">
Open Live Demo
</a> <br><br>

[![Netlify Status badge or similar]]

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

## Folder Structure

<img src="" alt="folder structure" width="150"/>

---

## Security

- ✅ Dependabot active for keeping dependencies updated
- ✅ Security policy configured
- ✅ Strict Content-Security-Policy (CSP) with sandboxed iframes

---

## License

MIT – see LICENSE.md for details.

---
