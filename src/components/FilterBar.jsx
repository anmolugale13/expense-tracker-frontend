import React from 'react';

export default function FilterBar({ onFilter }) {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="form-select w-100"
      style={{ maxWidth: '300px' }}
    >
      <option value="">All Categories</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Shopping">Shopping</option>
      <option value="Bills">Bills</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Other">Other</option>
    </select>
  );
}
