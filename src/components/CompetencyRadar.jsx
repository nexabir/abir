import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CompetencyRadar = ({ theme }) => {
  const isDark = theme === 'dark';
  
  const data = {
    labels: ['Technical', 'Strategic', 'Communication', 'Leadership', 'Analytical', 'Execution'],
    datasets: [
      {
        label: 'Current Proficiency',
        data: [90, 85, 95, 80, 92, 88],
        backgroundColor: isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(128, 0, 0, 0.15)',
        borderColor: isDark ? '#eab308' : '#800000',
        borderWidth: 2,
        pointBackgroundColor: isDark ? '#eab308' : '#800000',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: isDark ? '#eab308' : '#800000',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        },
        pointLabels: {
          color: isDark ? '#a1a1aa' : '#64748b',
          font: {
            size: 12,
            weight: '600',
            family: 'Inter',
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#18181b' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#0f172a',
        bodyColor: isDark ? '#a1a1aa' : '#64748b',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '350px', position: 'relative' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default CompetencyRadar;
