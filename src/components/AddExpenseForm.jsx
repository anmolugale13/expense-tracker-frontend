import React, { useState } from 'react';
import axios from 'axios';

export default function AddExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post(`${BASE_URL}/api/expenses`, formData);
  setFormData({ title: '', amount: '', category: '', date: '' });

  if (onAdd) onAdd(); // ✅ Trigger re-fetch after adding
};


  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', borderRadius: '0.5rem' }}>
      <div className="mb-3">
        <input type="text" name="title" value={formData.title} onChange={handleChange}
          placeholder="Title" required className="form-control" />
      </div>
      <div className="mb-3">
        <input type="number" name="amount" value={formData.amount} onChange={handleChange}
          placeholder="Amount" required className="form-control" />
      </div>
      <div className="mb-3">
        <select name="category" value={formData.category} onChange={handleChange}
          required className="form-select">
          <option value="">Category</option>
  <option value="Food">🍕 Food</option>
  <option value="Travel">✈️ Travel</option>
  <option value="Shopping">🛍️ Shopping</option>
  <option value="Bills">💡 Bills</option>
  <option value="Entertainment">🎬 Entertainment</option>
  <option value="Other">📦 Other</option>
  </select>
      </div>
      <div className="mb-3">
        <input type="date" name="date" value={formData.date} onChange={handleChange}
          required className="form-control" />
      </div>
      <button
  type="submit"
  className="btn w-100 fw-semibold"
  style={{
    backgroundImage: 'linear-gradient(90deg, #20b4caff, #e793cfff)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem'
  }}
>
  Add
</button>

    </form>
  );
}
