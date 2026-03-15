import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <FiAlertCircle className="text-red-500 text-xl flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};