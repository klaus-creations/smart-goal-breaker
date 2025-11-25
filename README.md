# 🔨 The Smart Goal Breaker

> **"Skip the boring interviews. Show us code."**

A Full-Stack AI application that transforms vague aspirations into concrete, actionable steps. Users input a goal (e.g., "Launch a Startup"), and the system uses Google Gemini AI to generate a 5-step action plan with a complexity score, saving the results to a PostgreSQL database.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-FastAPI_Next.js_PostgreSQL-blue)

## 🚀 Live Demo

- **Frontend Application:** https://smart-goal-breaker-mu.vercel.app/

---

## 🌟 Key Features

- **🤖 AI-Powered Breakdown:** Integrates with **Google Gemini 1.5 Flash** to analyze goals and generate structured JSON responses.
- **⚡ Real-time UX:** Optimistic updates and instant loading states using **TanStack Query**.
- **🔍 Smart Search:** Case-insensitive search functionality to filter through goal history.
- **📄 Pagination:** Handles large datasets efficiently with server-side pagination.
- **🛡️ Robust Error Handling:** Graceful degradation—if the AI fails, the DB remains clean.
- **🎨 Premium UI:** Built with **shadcn/ui** and Tailwind CSS for a polished, accessible experience.

---

## 🛠️ Tech Stack

### **Backend (Python)**

- **Framework:** FastAPI (High performance, easy async).
- **Database:** PostgreSQL (via SQLAlchemy ORM).
- **AI:** Google Generative AI (Gemini).
- **Validation:** Pydantic (Strict typing).
- **Architecture:** Modular Service-Repository pattern.

### **Frontend (TypeScript)**

- **Framework:** Next.js 14 (App Router).
- **State Management:** TanStack Query (React Query) v5.
- **Styling:** Tailwind CSS + shadcn/ui.
- **HTTP Client:** Axios (with Interceptors).

---
