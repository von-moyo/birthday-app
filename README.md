# 🎂 Birthday App

## 🚀 Overview
The **Birthday App** is a modern web application built with **React**, **TypeScript**, and **Vite**. It provides an intuitive user experience for managing and celebrating birthdays, with features like reminders, notifications, and a sleek UI.

## 📦 Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **State Management:** React Context API
- **UI Library:** Tailwind CSS
- **Form Handling:** React Hook Form + Yup Validation
- **Icons:** Lucide-react
- **Routing:** React Router
- **Animation:** Framer Motion
- **Cookies Management:** js-cookie
- **Linting:** ESLint + TypeScript ESLint Config

## 🛠️ Features
- 🎉 Add and manage birthdays
- 🎨 Beautiful, responsive UI
- 🔔 Reminders & Notifications
- 🚀 Smooth animations with Framer Motion

## 📖 Setup & Installation

### Prerequisites
- Node.js (Latest LTS recommended)
- Yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd birthday-app
   ```
2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```
3. **Start the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
4. **Open in Browser**
   Navigate to `http://localhost:5173/` (or the displayed URL) in your browser.

## 🛠️ Configuration
### Expanding ESLint Configuration
For production applications, enable type-aware lint rules:

1. Configure **`eslint.config.js`**
   ```js
   import react from 'eslint-plugin-react';
   
   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```
2. Update **parserOptions** in ESLint configuration:
   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

## 🚀 Deployment
For production deployment:
```bash
yarn build
```
The build output will be in the `dist/` folder, ready to be deployed to Vercel, Netlify, or any hosting service.

## 🎯 Contribution
Contributions are welcome! Follow these steps:
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push and create a PR

## 📜 License
This project is licensed under the MIT License.

---
**Happy Coding! 🎂🚀**

