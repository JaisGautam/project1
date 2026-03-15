

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTag, FiBriefcase } from 'react-icons/fi';

export const Home = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI Sustainability
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Intelligent tools for sustainable product categorization and B2B proposal generation
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/category" className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <FiTag className="text-white text-3xl" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Category Generator</h3>
            <p className="text-gray-600 mb-4">Automatically categorize products with AI</p>
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">Try Now</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link to="/proposal" className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <FiBriefcase className="text-white text-3xl" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Proposal Generator</h3>
            <p className="text-gray-600 mb-4">Create sustainable B2B proposals</p>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">Try Now</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};