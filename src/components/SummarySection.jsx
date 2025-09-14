import React from 'react';

export default function SummarySection({ summary }) {
  const total = summary.reduce((acc, item) => acc + item.total, 0);

  return (
  <div style={{ padding: '1rem' }}>
      <ul className="list-unstyled">
        {summary.map((item) => (
          <li
            key={item._id}
            className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2 bg-light"
          >
            <span className="text-dark">{item._id}</span>
            <span className="fw-semibold text-dark">₹{item.total}</span>
          </li>
        ))}
        <li
  className="d-flex justify-content-between align-items-center border rounded px-3 py-2"
  style={{ backgroundColor: '#e5f4ecff' }}
>
  <span className="fw-semibold text-dark">Total</span>
  <span className="fw-semibold text-dark">₹{total}</span>
</li>

      </ul>
    </div>
  );
}
