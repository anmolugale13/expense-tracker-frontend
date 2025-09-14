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

  const fetchExpenses = async (category = '') => {
  const res = await axios.get(`${BASE_URL}/api/expenses${category ? `?category=${category}` : ''}`);
  setExpenses(res.data);
  const summaryRes = await axios.get(`${BASE_URL}/api/expenses/summary`);
  setSummary(summaryRes.data);

  const labels = summaryRes.data.map((item) => item._id);
  const data = summaryRes.data.map((item) => item.total);

  setChartData({
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#3B82F6', '#10B981', '#f7ec22ff', '#EF4444', '#d98df2ff', '#f163b8ff'
        ],
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
    backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.PHrNuiVK9sSqTZtcnSFGdgHaNK?rs=1&pid=ImgDetMain&o=7&rm=3')",
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

          {/* 🔸 Top Row: Add Expense + Graph */}
          <div className="row g-4 mb-4">
            {/* Add Expense */}
            <div className="col-md-6">
  <section
    id="add-expense"
    style={{
      backgroundImage: "url('https://img.freepik.com/premium-photo/aesthetic-trendy-pastel-background_87720-46574.jpg?w=2000')",
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
            {/* Graph */}
            <div className="col-md-6">
              <section
               id="graph"
                style={{
                backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20220705/pngtree-light-blue-smoke-image_1417190.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "1rem",
                borderRadius: "0.5rem"
                }}
                >
              <h2 className="h5 fw-semibold mb-3" style={{ color: '#071d53ff' }}>Chart</h2>
              <CategoryChart chartData={chartData} />
             </section>

            </div>
          </div>

          {/* 🔸 Bottom Row: Summary + Expense List */}
          <div className="row g-4">
            {/* Summary */}
            <div className="col-md-6">
              <section
  id="summary"
  style={{
    backgroundImage: "url('https://i.pinimg.com/originals/f4/b9/fe/f4b9fe4e03a2ef397e496ab1cde8bb26.jpg')",
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

            {/* Expense List */}
            <div className="col-md-6">
              <section
                id="expense-list"
                className="card shadow-sm"
                style={{
                  backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/937/816/original/watercolor-pastel-green-and-yellow-painted-texture-abstract-background-vector.jpg  ')",
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
