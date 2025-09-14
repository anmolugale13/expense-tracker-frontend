import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpensePage from "./pages/EditExpensePage";

export default function App() {
  return (
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

  );
}
