import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ chartData }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="h5 fw-semibold text-secondary text-center mb-3">Category Breakdown</h3>
      {chartData && chartData.datasets?.[0]?.data?.length > 0 ? (
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
