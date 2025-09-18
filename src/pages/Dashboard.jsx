import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseCard from '../components/ExpenseCard';
import FilterBar from '../components/FilterBar';
import SummarySection from '../components/SummarySection';
import CategoryChart from '../components/CategoryChart';
import AddExpenseForm from '../components/AddExpenseForm';

export default function Dashboard() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState({ total: 0, month: 0, avg: 0 });

  const fetchExpenses = async (category = '', time = '') => {
  let query = '';
  if (category) query += `category=${category}`;
  if (time) query += `${query ? '&' : ''}time=${time}`;

  const res = await axios.get(`${BASE_URL}/api/expenses${query ? `?${query}` : ''}`);
  setExpenses(res.data);
  const totalAmount = res.data.reduce((sum, exp) => sum + exp.amount, 0);

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthExpenses = res.data.filter((exp) => {
  const expDate = new Date(exp.date);
  return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
});

const monthAmount = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

const today = new Date();
const daysInMonth = today.getDate();
const avgPerDay = daysInMonth > 0 ? (monthAmount / daysInMonth).toFixed(2) : 0;

setStats({
  total: totalAmount,
  month: monthAmount,
  avg: avgPerDay
});


  const summaryRes = await axios.get(`${BASE_URL}/api/expenses/summary`);
  setSummary(summaryRes.data);

  const categoryColors = {
  Food: '#f8b195',
  Travel: '#f67280',
  Shopping: '#b77f8fff',
  Bills: '#6c5b7b',
  Health: '#355c7d',
  Other: '#76a8a1'
};

const labels = summaryRes.data.map((item) => item._id);
const data = summaryRes.data.map((item) => item.total);
const backgroundColors = labels.map((label) => categoryColors[label] || '#cccccc');

setChartData({
  labels,
  datasets: [
    {
      data,
      backgroundColor: backgroundColors,
      borderWidth: 1,
    },
  ],
});
};



  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/expenses/${id}`);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-vh-100 bg-dark py-5 px-3">
      <div className="container px-4">
        <div className="mb-5">

          {/* 🔹 Navbar Section */}
          <section id="navbar" className="card shadow-sm mb-4">
  <div className="card-body bg-white bg-opacity-75 rounded">
    <div className="d-flex justify-content-between align-items-center">
      <h1
        className="h3 fw-bold"
        style={{
          background: 'linear-gradient(90deg, #00188f, #ec008c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          marginBottom: '0'
        }}
      >
        Expense Tracker
      </h1>

      <div className="d-flex flex-wrap gap-2 justify-content-center" style={{ maxWidth: '100%' }}>
        <a href="#add-expense" className="btn btn-dark px-3 py-1 small" style={{ color: '#ffffff' }}>➕</a>
        <a href="#expense-list" className="btn btn-dark px-2 py-1 small">🗒️</a>
        <a href="#summary" className="btn btn-dark px-3 py-1 small">📋</a>
        <a href="#graph" className="btn btn-dark px-2 py-1 small">📊</a>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button
          onClick={() => document.body.classList.toggle('dark-mode')}
          className="btn btn-outline-dark btn-sm"
        >
          🌓
        </button>
      </div>
    </div>
  </div>

</section>



          <hr className="my-4 border-secondary" />

          {/* 🔸 Top Row: Add Expense + Summary */}
<div className="row g-4 mb-4">
  {/* Add Expense */}
  <div className="col-md-6">
    <section id="add-expense" className="card shadow-sm">
  <div className="card-body bg-white bg-opacity-75 rounded">
    <h2 className="h5 fw-semibold mb-3" style={{ color: '#0c2974ff' }}>➕ Add Expense</h2>
    <AddExpenseForm onAdd={fetchExpenses} />
  </div>
</section>


  </div>

  {/* Summary */}
  <div className="col-md-6">
    <section id="summary" className="card shadow-sm">
  <div className="card-body bg-white bg-opacity-75 rounded">
    <h2 className="h5 fw-semibold mb-3" style={{ color: '#0c2974ff' }}>📋 Summary</h2>
    <SummarySection summary={summary} />
  </div>
</section>

  </div>
</div>


          {/* 🔸 Bottom Row: Chart + Expense List */}
<div className="row g-4">
  {/* Chart */}
  <div className="col-md-6">
    <section id="graph" className="card shadow-sm">
  <div className="card-body bg-white bg-opacity-75 rounded">
    <h2 className="h5 fw-semibold mb-3" style={{ color: '#0c2974ff' }}>📊 Chart</h2>
    <CategoryChart chartData={chartData} />
    <div className="d-flex justify-content-around text-center mt-3 flex-wrap">
      <div className="px-3 py-2 bg-white rounded shadow-sm" style={{ minWidth: '120px' }}>
        <div className="fw-bold text-secondary small">🧮Total</div>
        <div className="fs-6 text-dark">₹{stats.total}</div>
      </div>
      <div className="px-3 py-2 bg-white rounded shadow-sm" style={{ minWidth: '120px' }}>
        <div className="fw-bold text-secondary small">📆This Month</div>
        <div className="fs-6 text-dark">₹{stats.month}</div>
      </div>
      <div className="px-3 py-2 bg-white rounded shadow-sm" style={{ minWidth: '120px' }}>
        <div className="fw-bold text-secondary small">📊Avg/Day</div>
        <div className="fs-6 text-dark">₹{stats.avg}</div>
      </div>
    </div>
  </div>
</section>

  </div>

  {/* Expense List */}
  <div className="col-md-6">
    <section
      id="expense-list"
      className="card shadow-sm"
      style={{
  backgroundColor: "#ffffff",
  borderRadius: "0.5rem",
  border: "1px solid #bcd6efff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
}}

    >
      <div className="card-body bg-white bg-opacity-75 rounded">
        <h2 className="h5 fw-semibold mb-3" style={{ color: '#0c2974ff' }}>🗒️ List</h2>
        <FilterBar onFilter={fetchExpenses} />
        <div className="mt-3">
          {expenses.map((exp) => (
            <ExpenseCard key={exp._id} expense={exp} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}
