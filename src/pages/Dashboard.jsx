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
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container px-4">
        <div className="mb-5">

          {/* 🔹 Navbar Section */}
          <section
  id="navbar"
  style={{
    backgroundImage: "url('https://i.pinimg.com/originals/94/dd/17/94dd17e01daa1ceb63483e043d376350.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem"
  }}
>
  <div className="d-flex justify-content-between align-items-center">
  <h1 className="h3 fw-bold" style={{ color: '#0f1518ff' }}>Expense Tracker</h1>
  <div className="d-flex flex-wrap gap-2 justify-content-center" style={{ maxWidth: '100%' }}>
    <a
      href="#add-expense"
      className="btn btn-dark px-3 py-1 small"
      style={{ color: '#ffffff' }}
    >
      ➕
    </a>
    <a href="#expense-list" className="btn btn-dark px-2 py-1 small">🗒️</a>
    <a href="#summary" className="btn btn-dark px-3 py-1 small">📋</a>
    <a href="#graph" className="btn btn-dark px-2 py-1 small">📊</a>
  </div>
</div>

</section>


          <hr className="my-4 border-secondary" />

          {/* 🔸 Top Row: Add Expense + Summary */}
<div className="row g-4 mb-4">
  {/* Add Expense */}
  <div className="col-md-6">
    <section
      id="add-expense"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/4110648.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
        borderRadius: "0.5rem"
      }}
    >
      <h2 className="h5 fw-semibold mb-3" style={{ color: '#2e0236ff' }}>Add Expense</h2>
      <AddExpenseForm onAdd={fetchExpenses} />
    </section>
  </div>

  {/* Summary */}
  <div className="col-md-6">
    <section
      id="summary"
      style={{
        backgroundImage: "url('https://th.bing.com/th/id/R.eb2e3708d41035629ff80b27b73716fc?rik=Ea7q2iN1Ms%2bTeQ&riu=http%3a%2f%2fwww.scrappnsavvy.com%2fcdn%2fshop%2ffiles%2fScreenshot2024-03-27232819.png%3fv%3d1711600163&ehk=3G1lttRgCPAJewGqoD8Q194AQlUmlX8fvvI9RR%2f9GbM%3d&risl=&pid=ImgRaw&r=0g')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
        borderRadius: "0.5rem"
      }}
    >
      <h2 className="h5 fw-semibold mb-3" style={{ color: '#033b09ff' }}>Summary</h2>
      <SummarySection summary={summary} />
    </section>
  </div>
</div>


          {/* 🔸 Bottom Row: Chart + Expense List */}
<div className="row g-4">
  {/* Chart */}
  <div className="col-md-6">
    <section
      id="graph"
      style={{
        backgroundImage: "url('https://s-media-cache-ak0.pinimg.com/736x/d6/f0/b6/d6f0b62d743fd1efe28908d0e0340ea1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
        borderRadius: "0.5rem"
      }}
    >
      <h2 className="h5 fw-semibold mb-3" style={{ color: '#071d53ff' }}>Chart</h2>
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
    </section>
  </div>

  {/* Expense List */}
  <div className="col-md-6">
    <section
      id="expense-list"
      className="card shadow-sm"
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/light-pink-background-bwuhuuvcaqs1owpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="card-body bg-white bg-opacity-75 rounded">
        <h2 className="h5 fw-semibold mb-3" style={{ color: '#3e3f07ff' }}>List</h2>
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
