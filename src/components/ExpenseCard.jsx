import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExpenseCard({ expense, onDelete }) {
  const navigate = useNavigate();
  const handleDelete = () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (confirmDelete) {
    onDelete(expense._id);
  }
};
const getCategoryIcon = (category) => {
  const icons = {
    Food: '🍕',
    Travel: '✈️',
    Shopping: '🛍️',
    Bills: '💡',
    Entertainment: '🎬',
    Other: '📦'
  };
  return icons[category] || '';
};

  return (
    <div className="d-flex justify-content-between align-items-center bg-white border-bottom rounded px-3 py-2 shadow-sm w-100 mx-auto mb-2" style={{ maxWidth: '97%' }}>
      {/* Expense Details */}
      <div className="flex-grow-1 text-secondary text-truncate small">
        {expense.title} • ₹{expense.amount} • {getCategoryIcon(expense.category)} {expense.category} •{" "}
        {new Date(expense.date).toLocaleDateString()}
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-1">
        <button
          onClick={() => navigate(`/edit/${expense._id}`)}
          className="btn btn-sm"
          style={{
            backgroundColor: '#e3f2fd',
            color: '#0000a0',
            border: '1px solid #bbdefb'
          }}
        >
          Edit
        </button>
        <button
  onClick={handleDelete}
  className="btn btn-sm"
  style={{
    backgroundColor: '#e3f2fd',
    color: '#0000a0',
    border: '1px solid #bbdefb'
  }}
>
  Delete
</button>

      </div>
    </div>
  );
}
