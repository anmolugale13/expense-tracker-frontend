import React, { useState } from 'react';

export default function FilterBar({ onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleFilterChange = (category, time) => {
    onFilter(category, time);
  };

  return (
    <div className="d-flex gap-2 flex-wrap" style={{ maxWidth: '620px' }}>
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          const newCategory = e.target.value;
          setSelectedCategory(newCategory);
          handleFilterChange(newCategory, selectedTime);
        }}
        className="form-select w-100"
        style={{ maxWidth: '300px' }}
      >
        <option value="">All Categories</option>
        <option value="Food">🍽️Food</option>
        <option value="Travel">✈️Travel</option>
        <option value="Shopping">🛍️Shopping</option>
        <option value="Bills">💸Bills</option>
        <option value="Entertainment">🎉Entertainment</option>
        <option value="Other">🗂️Other</option>
      </select>

      {/* Time Filter */}
      <select
        value={selectedTime}
        onChange={(e) => {
          const newTime = e.target.value;
          setSelectedTime(newTime);
          handleFilterChange(selectedCategory, newTime);
        }}
        className="form-select w-100"
        style={{ maxWidth: '300px' }}
      >
        <option value="">All Time</option>
        <option value="today">📅 Today</option>
        <option value="week">🗓️ This Week</option>
        <option value="month">📆 This Month</option>
      </select>
    </div>
  );
}
