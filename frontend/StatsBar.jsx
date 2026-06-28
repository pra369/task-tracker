import React from 'react';

const StatsBar = ({ stats }) => {
  if (!stats) return null;
  const getCount = (arr, id) => arr.find(x => x._id === id)?.count || 0;
  return (
    <div className="stats-bar">
      <div className="stat-card stat-total">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card stat-pending">
        <span className="stat-num">{getCount(stats.byStatus, 'pending')}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-card stat-progress">
        <span className="stat-num">{getCount(stats.byStatus, 'in-progress')}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-card stat-done">
        <span className="stat-num">{getCount(stats.byStatus, 'completed')}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
};

export default StatsBar;