import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

 const BASE_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  axios.get(`${BASE_URL}/api/expenses`)
    .then(res => {
      const expense = res.data.find(e => e._id === id);
      if (expense) {
        setFormData({
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: expense.date.slice(0, 10)
        });
      }
    })
    .catch(err => console.error('Fetch error:', err));
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.delete(`${BASE_URL}/api/expenses/${id}`);
    await axios.post(`${BASE_URL}/api/expenses`, formData);
    navigate('/');
  } catch (err) {
    console.error('Update error:', err);
  }
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};
  return (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: "url('https://img.freepik.com/free-vector/smooth-white-wave-background_52683-55288.jpg?w=2000')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      boxSizing: 'border-box'
    }}
  >
    <div
      className="bg-white rounded shadow p-4 position-relative"
      style={{ width: '100%', maxWidth: '480px' }}
    >
      {/* Cross button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="btn-close position-absolute"
        style={{ top: '1rem', right: '1rem' }}
        aria-label="Close"
      ></button>

      <h2 className="h4 fw-semibold text-center mb-4" style={{ color: '#4b3b3b' }}>
        Edit Expense
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="form-control"
            style={{
              borderColor: '#e7dcd5',
              color: '#4b3b3b',
              backgroundColor: '#fff'
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="form-control"
            style={{
              borderColor: '#e7dcd5',
              color: '#4b3b3b',
              backgroundColor: '#fff'
            }}
          />
        </div>
        <div className="mb-3">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-select"
            style={{
              borderColor: '#e7dcd5',
              color: '#4b3b3b',
              backgroundColor: '#fff'
            }}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-control"
            style={{
              borderColor: '#e7dcd5',
              color: '#4b3b3b',
              backgroundColor: '#fff'
            }}
          />
        </div>
        <button
          type="submit"
          className="btn w-100 fw-semibold"
          style={{
            backgroundColor: '#e7dcd5',
            color: '#4b3b3b',
            border: 'none'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#d8c8be')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#e7dcd5')}
        >
          Update Expense
        </button>
      </form>
    </div>
  </div>
);
}
