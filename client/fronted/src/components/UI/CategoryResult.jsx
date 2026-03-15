


import React from 'react';
import { FiCheckCircle, FiTag, FiFilter } from 'react-icons/fi';

export const CategoryResult = ({ result }) => {
  if (!result) return null;

  const getCategoryColor = (category) => {
    const colors = {
      'Personal Care': 'bg-pink-100 text-pink-800',
      'Fashion': 'bg-purple-100 text-purple-800',
      'Home': 'bg-blue-100 text-blue-800',
      'Food': 'bg-orange-100 text-orange-800',
      'Electronics': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center space-x-2">
          <FiCheckCircle className="text-white text-xl" />
          <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Product Name */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Product</p>
          <p className="text-xl font-semibold text-gray-800">{result.productName}</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Primary Category</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(result.primaryCategory)}`}>
              {result.primaryCategory}
            </span>
          </div>
          
          {result.subCategory && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Sub Category</p>
              <p className="text-sm font-medium text-gray-700">{result.subCategory}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        {result.tags?.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FiTag className="text-gray-400" />
              <p className="text-sm font-medium text-gray-700">SEO Tags</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sustainability Filters */}
        {result.sustainabilityFilters?.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FiFilter className="text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Sustainability</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.sustainabilityFilters.map((filter, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                >
                  🌱 {filter}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Generated: {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};