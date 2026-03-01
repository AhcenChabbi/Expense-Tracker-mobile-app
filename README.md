# 💸 Expense Tracker with Expo Router & Express 🚀

A full-stack mobile expense tracking application built with **React Native (Expo)** on the frontend and **Express.js** on the backend. Track your income and expenses, manage transactions, and visualize your financial balance — all with a beautiful UI supporting dark and light themes.

---

## 🎯 App Features Overview

- 🔐 **Authentication** with email verification using [Clerk](https://clerk.com/)
- 📝 **Signup & Login** flows with 6-digit email verification code
- 🪪 **Profile Management** — Update first name, last name, username, and password
- 🏠 **Home Screen** — View current balance & past transactions
- ➕ **Create Transactions** — Add income or expense entries
- 🔄 **Pull to Refresh** — Custom pull-to-refresh functionality built from scratch
- 🗑️ **Delete Transactions** — Remove transactions and auto-update balance
- 🚪 **Logout** — Securely sign out and return to login screen
- 🌙 **Dark Mode** & ☀️ **Light Mode** — Full theme support

---

## 🛠️ Tech Stack

### Client (`expense-tracker/`)

| Technology                                                                     | Purpose                                   |
| ------------------------------------------------------------------------------ | ----------------------------------------- |
| [Expo Router](https://docs.expo.dev/router/introduction/)                      | File-based navigation                     |
| [NativeWind](https://www.nativewind.dev/)                                      | Tailwind CSS for React Native             |
| [Clerk](https://clerk.com/)                                                    | Authentication & user management          |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Smooth animations (pull-to-refresh, etc.) |
| [React Hook Form](https://react-hook-form.com/)                                | Form state management                     |
| [Zod](https://zod.dev/)                                                        | Schema validation                         |
| [Axios](https://axios-http.com/)                                               | HTTP client                               |
| [React Query (TanStack)](https://tanstack.com/query)                           | Server state management & caching         |

### Server (`backend/`)

| Technology                                    | Purpose                 |
| --------------------------------------------- | ----------------------- |
| [Express.js](https://expressjs.com/)          | REST API framework      |
| [Prisma](https://www.prisma.io/)              | ORM for database access |
| [PostgreSQL](https://www.postgresql.org/)     | Relational database     |
| [Redis](https://redis.io/)                    | Caching layer           |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe backend code  |

---

## 📁 Project Structure

```
├── README.md
├── screenshots/                  # App screenshots
│
├── backend/                      # Express.js API server
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/                   # Prisma schema & migrations
│   ├── src/                      # Source code
│   │   ├── config/               # App configuration
│   │   ├── constants/            # Constant values
│   │   ├── controllers/          # Route controllers
│   │   ├── lib/                  # Shared libraries (Prisma client, Redis, etc.)
│   │   └── ...
│   └── build/                    # Compiled JavaScript output
│
├── expense-tracker/              # Expo React Native app
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js        # NativeWind/Tailwind configuration
│   ├── global.css                # Global styles
│   ├── app/                      # Expo Router file-based routes
│   ├── components/               # Reusable UI components
│   ├── config/                   # App configuration
│   ├── constants/                # Constant values
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Shared libraries (Axios instance, etc.)
│   ├── providers/                # Context providers (Theme, Auth, etc.)
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   ├── assets/                   # Images, fonts, etc.
│   └── scripts/                  # Helper scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- **PostgreSQL** database running
- **Redis** server running
- **Expo CLI** (`npm install -g expo-cli`)
- [Clerk](https://clerk.com/) account for authentication keys

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Expense tracker"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>"
REDIS_URL="redis://localhost:6379"
PORT=3000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd expense-tracker
npm install
```

Create a `.env` file in `expense-tracker/` with the following variables:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
EXPO_PUBLIC_API_URL=http://<your-ip>:3000
```

Start the Expo development server:

```bash
npx expo start
```

---

## 📱 Screenshots

### Dark Mode

![Dark mode](./screenshots/dark%20mode.png)

### Light Mode

![Light mode](./screenshots/light%20mode.png)

---

## 📡 API Overview

The backend exposes RESTful endpoints for transaction management:

| Method   | Endpoint                | Description                 |
| -------- | ----------------------- | --------------------------- |
| `GET`    | `/api/transactions`     | Fetch all user transactions |
| `POST`   | `/api/transactions`     | Create a new transaction    |
| `DELETE` | `/api/transactions/:id` | Delete a transaction        |
| `GET`    | `/api/user/balance`     | Get current user balance    |

> **Note:** All endpoints require authentication via Clerk tokens.

---

## 🧪 Development

### Backend

```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript to JavaScript
```

### Frontend

```bash
cd expense-tracker
npx expo start       # Start Expo dev server
npx expo start --ios # Run on iOS simulator
npx expo start --android # Run on Android emulator
```

---

## 📄 License

This project is for educational and personal use.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
