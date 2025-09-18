import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function CategoryChart({ chartData, chartType }) {
  if (!chartData) return null;

  return chartType === 'bar' ? (
    <div className="bg-white rounded shadow p-4">
      <h3 className="h5 fw-semibold text-secondary text-center mb-3">Category Breakdown</h3>
      <div className="d-flex justify-content-center">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded shadow p-4">
      <h3 className="h5 fw-semibold text-secondary text-center mb-3">Category Breakdown</h3>
      {chartData.datasets?.[0]?.data?.length > 0 ? (
        <div className="d-flex justify-content-center">
          <div style={{ width: '256px', height: '256px' }}>
            <Pie data={chartData} />
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">No chart data available</p>
      )}
    </div>
  );
}
