

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiBriefcase, FiDollarSign, FiTarget, FiLoader } from 'react-icons/fi';
import { proposalAPI } from '../services/api';
import { ProposalResult } from '../components/UI/ProposalResult';
import { ErrorMessage } from '../components/common/ErrorMessage';

export const Proposal = () => {
  const [formData, setFormData] = useState({
    budget: 50000,
    companyType: '',
    sustainabilityGoals: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyType.trim()) {
      toast.error('Please enter company type');
      return;
    }

    setLoading(true);
    setError('');
    
    const goalsArray = formData.sustainabilityGoals
      .split(',')
      .map(g => g.trim())
      .filter(g => g);

    try {
      const response = await proposalAPI.generate({
        budget: Number(formData.budget),
        companyType: formData.companyType,
        sustainabilityGoals: goalsArray
      });
      
      setResult(response.data);
      toast.success('Proposal generated successfully!');
    } catch (err) {
      setError('Failed to generate proposal');
      toast.error('Failed to generate proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">B2B Proposal Generator</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
        
        <input
          type="text"
          name="companyType"
          placeholder="Company Type"
          value={formData.companyType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        <div className="relative">
          <FiTarget className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="sustainabilityGoals"
            placeholder="Sustainability Goals (comma-separated)"
            value={formData.sustainabilityGoals}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <FiLoader className="animate-spin" /> : 'Generate Proposal'}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
      {result && <ProposalResult result={result} />}
    </div>
  );
};