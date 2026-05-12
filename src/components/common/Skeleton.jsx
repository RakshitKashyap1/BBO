import React from 'react';

export const Skeleton = ({ type = 'text', className = '' }) => {
  const classes = `skeleton skeleton-${type} ${className}`;
  return <div className={classes}></div>;
};

export const CardSkeleton = () => (
  <div className="card">
    <Skeleton type="card" />
    <div style={{ marginTop: '1rem' }}>
      <Skeleton type="title" />
      <Skeleton type="text" />
      <Skeleton type="text" style={{ width: '80%' }} />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          {[1, 2, 3, 4].map((i) => (
            <th key={i}><Skeleton type="text" style={{ width: '50px' }} /></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            {[1, 2, 3, 4].map((j) => (
              <td key={j}><Skeleton type="text" /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
