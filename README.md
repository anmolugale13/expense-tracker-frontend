# 💸 Expense Tracker — Frontend

A responsive, pastel-themed expense tracking web app built with React and Vite. Users can add, view, edit, and visualize expenses by category. Designed for elegance, clarity, and seamless backend integration.

## 🚀 Live Demo

🔗 https://expense-tracker-frontend-ydtx.onrender.com


## 🛠️ Tech Stack

- React (with Hooks)
- Vite
- Axios
- Bootstrap 5
- Render (for deployment)


## 📁 Folder Structure
src/ 

├── components/ 

│  ├── AddExpenseForm.jsx

│  ├── CategoryChart.jsx

│  ├── ExpenseCard.jsx 

│  ├── FilterBar.jsx 

│ └── SummarySection.jsx

├── pages/

│  ├── Dashboard.jsx 

│  ├── AddExpense.jsx 

│  └── EditExpensePage.jsx 

├── App.jsx 

└── main.jsx


## 🧪 Components

Expense List → Show all expenses in table or card view

Add Expense Form → Input fields: title, amount, category, date

Summary Section → Show total spent and breakdown by category


## 🧪 Features

Add new expenses with title, amount, category, and date

View all expenses in a scrollable list

Edit or delete existing entries

Filter/search by category or date range

Visualize category breakdown with a responsive chart

Summary section with total and category-wise stats

Mobile-first design with elegant nude-tone styling


## 🖼️ UI Highlights

Styling with Bootstrap for clean UI

Theme Toggle

Expense Trends Graph Line chart showing monthly spending over time

Clean navigation bar with emoji icons

Form inputs styled with soft borders and pastel backgrounds

Chart legend with color-coded categories

Responsive layout for mobile and desktop



## 🧩 Backend Integration

This frontend connects to the Expense Tracker Backend via REST API.



## 📤 Deployment

Hosted on Render as a static site. Auto-deploys on every push to master.



## 🌐 Environment Variables

Create a `.env` file in the root of the frontend project:

env
(VITE_API_URL=https://your-backend-url.onrender.com)


## 📦 Installation

```bash
git clone https://github.com/anmolugale13/expense-tracker-frontend.git
cd expense-tracker-frontend
npm install
npm run dev



