# 💰 Expense Tracker

A full-stack personal expense tracking application with AI-powered expense categorization, analytics, PDF reports, and a premium leaderboard feature. Built with React + Vite on the frontend and Node.js/Express + MongoDB on the backend.

## ✨ Features

- **Authentication** — Secure signup/login with JWT-based auth and bcrypt password hashing
- **Expense Management** — Add, edit, delete, and filter expenses
- **AI Categorization** — Expenses are auto-categorized using Google's Gemini AI (Food, Fuel, Movies, Travel, Shopping, Bills, Entertainment, Other)
- **Dashboard** — At-a-glance overview of spending with stats cards and recent transactions
- **Analytics** — Visual breakdowns by category and month using interactive charts (Recharts)
- **Reports** — Monthly summaries with downloadable PDF export (jsPDF)
- **Password Recovery** — Email-based forgot/reset password flow via Brevo (Sendinblue) transactional email
- **Premium & Leaderboard** — Upgrade to premium via Cashfree payment gateway to unlock a leaderboard feature
- **Responsive UI** — Built with Tailwind CSS and Lucide icons

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Recharts (charts/graphs)
- React Hook Form
- Axios
- jsPDF + jsPDF-AutoTable (PDF report generation)
- React Hot Toast (notifications)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
- Google Gemini AI (`@google/genai`) for expense categorization
- Cashfree Payment Gateway for premium purchases
- Brevo (`sib-api-v3-sdk`) for transactional emails
- Morgan (logging) + Compression + CORS

## 📁 Project Structure

```
ExpenseTracker/
├── Backend/
│   ├── controllers/       # Route handler logic
│   ├── middleware/        # Auth & premium-access middleware
│   ├── models/            # Mongoose schemas (User, Expense, Order, ForgotPassword)
│   ├── routes/            # Express route definitions
│   ├── utils/             # DB connection, config, AI service
│   └── app.js              # App entry point
└── Frontend/
    ├── src/
    │   ├── components/    # UI, auth, layout, dashboard, expense, analytics, reports, settings, premium components
    │   ├── pages/          # Route-level pages (Dashboard, Expenses, Analytics, Reports, Settings, Login, Register, Leaderboard...)
    │   ├── routes/         # App routing & protected routes
    │   ├── services/       # API service layer (axios)
    │   ├── context/        # Auth context provider
    │   └── layouts/        # Main app layout
    └── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- A MongoDB instance (local or Atlas)
- API keys for: Google Gemini, Cashfree, and Brevo (see below)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Google Gemini AI (for auto-categorization)
GEMINI_API_KEY=your_gemini_api_key

# Cashfree Payment Gateway
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key

# Brevo (Sendinblue) — transactional email for password reset
BREVO_API_KEY=your_brevo_api_key

# Frontend URL (used for payment redirect callbacks)
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
node app.js
```

The API will run on `http://localhost:3000` (or your configured `PORT`).

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📡 API Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|:---:|
| POST | `/auth/signup` | Register a new user | ❌ |
| POST | `/auth/login` | Log in | ❌ |
| GET | `/dashboard` | Get dashboard summary data | ✅ |
| POST | `/expense/add-expense` | Add a new expense | ✅ |
| GET | `/expense/get-expenses` | List expenses | ✅ |
| PUT | `/expense/edit-expense/:id` | Edit an expense | ✅ |
| DELETE | `/expense/delete-expense/:id` | Delete an expense | ✅ |
| GET | `/report` | Get expense report data | ✅ |
| POST | `/purchase/premium` | Create a premium purchase order | ✅ |
| POST | `/purchase/updatetransactionstatus` | Verify/update payment status | ✅ |
| GET | `/leaderboard` | View leaderboard | ✅ (Premium) |
| POST | `/forgotpassword` | Request a password reset link | ❌ |
| GET | `/resetpassword/:id` | Validate a reset request | ❌ |
| POST | `/updatepassword/:id` | Set a new password | ❌ |

## 🔒 Environment Variables Reference

| Variable | Description |
|----------|--------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key for AI expense categorization |
| `CASHFREE_APP_ID` / `CASHFREE_SECRET_KEY` | Cashfree payment gateway credentials (sandbox by default) |
| `BREVO_API_KEY` | Brevo API key for sending password-reset emails |
| `FRONTEND_URL` | Frontend base URL, used in payment return callback |
| `PORT` | Backend server port (defaults to 3000) |

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements.

## 📄 License

Murli Kumar
