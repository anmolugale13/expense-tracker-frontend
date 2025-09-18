import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpensePage from "./pages/EditExpensePage";

const BASE_URL = import.meta.env.VITE_API_URL;

fetch(`${BASE_URL}/api/expenses`)
  .then(res => res.json())
  .then(data => console.log(data));
  const darkModeStyles = `
  body.dark-mode {
    background-color: #121212;
    color: #f1f1f1;
  }

  body.dark-mode section,
  body.dark-mode .card {
    background-color: #1e1e1e !important;
    border-color: #333 !important;
  }

  body.dark-mode input,
  body.dark-mode select,
  body.dark-mode textarea {
    background-color: #2c2c2c;
    color: #f1f1f1;
    border-color: #444;
  }

  body.dark-mode .btn {
    background-color: #333;
    color: #f1f1f1;
    border-color: #555;
  }
`;

export default function App() {
  return (
    <>
      <style>{darkModeStyles}</style>
   <BrowserRouter>
  <div className="min-h-screen bg-[#fdf7f2] flex items-center justify-center px-4">
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/edit/:id" element={<EditExpensePage />} />
      </Routes>
    </div>
  </div>
</BrowserRouter>
</>
  );
}
