// AdminDashboard.jsx
import React from 'react';
import {
  Bar,
  Line,
  Doughnut,
  Pie
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Dashboard = ({ darkMode }) => {
  const salesData = {
    labels,
    datasets: [{
      label: 'Monthly Sales',
      data: [120, 150, 180, 90, 200, 170, 220, 160, 190, 240, 260, 300],
      backgroundColor: '#4f46e5'
    }]
  };

  const ordersData = {
    labels,
    datasets: [{
      label: 'Monthly Orders',
      data: [90, 110, 130, 85, 160, 140, 190, 120, 170, 210, 230, 250],
      fill: false,
      borderColor: '#10b981'
    }]
  };

  const usersData = {
    labels: labels,
    datasets: [{
      label: 'Total Users',
      data: [20, 35, 40, 55, 60, 75, 90, 105, 130, 150, 165, 180],
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#ec4899', '#f97316',
        '#10b981', '#f59e0b', '#3b82f6', '#ef4444',
        '#14b8a6', '#e11d48', '#0ea5e9', '#22c55e'
      ]
    }]
  };

  const revenueData = {
    labels,
    datasets: [{
      label: 'Monthly Revenue',
      data: [3000, 3200, 4000, 2800, 5000, 4800, 5500, 5200, 6000, 6500, 6700, 7000],
      backgroundColor: [
        '#f43f5e', '#6366f1', '#10b981', '#f59e0b',
        '#3b82f6', '#e11d48', '#22c55e', '#a855f7',
        '#06b6d4', '#84cc16', '#f87171', '#0ea5e9'
      ]
    }]
  };

  const cardClasses = `p-4 rounded-2xl shadow transition-colors duration-300 ${
    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
  }`;

  return (
    <div className={`p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={cardClasses}>
        <h2 className="text-xl font-semibold mb-2">Sales Chart</h2>
        <Bar data={salesData} />
      </div>
      <div className={cardClasses}>
        <h2 className="text-xl font-semibold mb-2">Orders Chart</h2>
        <Line data={ordersData} />
      </div>
      <div className={cardClasses}>
        <h2 className="text-xl font-semibold mb-2">User Growth</h2>
        <Doughnut data={usersData} />
      </div>
      <div className={cardClasses}>
        <h2 className="text-xl font-semibold mb-2">Revenue</h2>
        <Pie data={revenueData} />
      </div>
    </div>
  );
};

export default Dashboard;
