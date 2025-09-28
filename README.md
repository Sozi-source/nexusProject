# eDUKA – Online Shopping Platform

**eDUKA** is a modern, responsive e-commerce web application built with Next.js, Tailwind CSS, and Firebase. It provides users with an intuitive shopping experience, supporting product browsing, category filtering, and a fully integrated cart system. The project demonstrates full-stack development capabilities with a focus on React-based front-end, Firebase backend, and PWA optimization.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Technology Stack](#technology-stack)  
4. [Installation](#installation)  
5. [Environment Variables](#environment-variables)  
6. [Project Structure](#project-structure)  
7. [Screenshots](#screenshots)  
8. [Usage](#usage)  
9. [Project Progress Tracker](#project-progress-tracker)  
10. [Live Demo & Deployment](#live-demo--deployment)  
11. [Future Improvements](#future-improvements)  
12. [Author](#author)  

---

## Project Overview

eDUKA is designed for effortless online shopping. Users can:

- Browse products and categories  
- Filter products by category groups (e.g., Electronics, Fashion)  
- View detailed product information  
- Add items to a cart and manage purchases  
- Sign in and out securely using Firebase Authentication  
- Store user data (cart, preferences) in Firebase Firestore  
- Enjoy a fully responsive UI across mobile, tablet, and desktop  
- Experience optimized performance with Progressive Web App (PWA) features  
- Interact with modern icons using **Lucide** and **React Icons**  

The project uses **DummyJSON API** for products data during development.

---

## Features

- **Responsive Product Grid**: Product images scale according to screen size.  
- **Grouped Categories**: Categories are grouped for better UX (Electronics, Beauty, Fashion, etc.).  
- **Product Card**: Includes thumbnail, title, brand, price, stock info, and responsive action buttons.  
- **Cart Integration**: Add products to a cart with stock management.  
- **Firebase Authentication**: Sign up, sign in, and sign out securely.  
- **Firebase Firestore Database**: Store user data and manage cart items persistently.  
- **Next.js Optimizations**: Uses `next/image` for responsive and optimized images.  
- **Progressive Web App (PWA)**: Improved performance, offline support, and mobile-first experience.  
- **Lucide & React Icons**: Modern, scalable icons for buttons and UI components.  
- **Tailwind CSS**: Fully styled with utility-first classes and responsive breakpoints.  
- **ESLint**: Maintains clean and consistent code quality.  
- **Loading Skeletons**: Smooth loading placeholders for categories and products.  

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React |
| Styling | Tailwind CSS |
| Icons | Lucide Icons, React Icons (BiCart) |
| Data | DummyJSON API, Firebase Firestore |
| Authentication | Firebase Authentication |
| State Management | React Context API (CartContext) |
| Image Optimization | Next.js Image Component |
| PWA | Next.js PWA plugin |
| Linting | ESLint |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## Installation

1. Clone the repository:  
- git clone "git@github.com:Sozi-source/nexusProject.git"

2. Navigate to the project folder
- cd eDuka

3. Install dependencies
- npm install

4. Run the development server
- npm run dev
5. Open the app in your browser
- run the local server

 ## Usage

- Browse the sidebar categories to filter products by group.

- Click View Details to see product information.

- Use Add to Cart to add items (cart integrates with context API).

- Sign in/sign out using Firebase Authentication.

- Experience offline support and improved performance with PWA.

- UI uses Lucide & React Icons for modern interactive elements.

