import React from 'react';

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === 'success' ? '✅' : '❌'} {toast.message}
    </div>
  );
};

export default Toast;