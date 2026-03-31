// // import React, { useState } from 'react';

// // const API_BASE_URL = 'http://localhost:5000';

// // export const ProposalGenerator = () => {
// //   const [budget, setBudget] = useState(50000);
// //   const [companyType, setCompanyType] = useState('');
// //   const [goals, setGoals] = useState('');
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
    
// //     const goalsArray = goals.split(',').map(g => g.trim()).filter(g => g);

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/proposal/generate`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ 
// //           budget: Number(budget), 
// //           companyType, 
// //           sustainabilityGoals: goalsArray 
// //         }),
// //       });
      
// //       if (!response.ok) throw new Error('API call failed');
      
// //       const data = await response.json();
// //       setResult(data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4 border rounded-lg shadow">
// //       <h2 className="text-xl font-bold mb-4">📝 AI B2B Proposal Generator</h2>
      
// //       <form onSubmit={handleSubmit} className="space-y-3">
// //         <div>
// //           <label className="block text-sm font-medium mb-1">Budget (₹)</label>
// //           <input
// //             type="number"
// //             value={budget}
// //             onChange={(e) => setBudget(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             min="1000"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium mb-1">Company Type</label>
// //           <input
// //             type="text"
// //             value={companyType}
// //             onChange={(e) => setCompanyType(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             placeholder="e.g., Corporate Gifting"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm font-medium mb-1">Sustainability Goals (comma-separated)</label>
// //           <input
// //             type="text"
// //             value={goals}
// //             onChange={(e) => setGoals(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             placeholder="plastic-free, local-sourcing"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
// //         >
// //           {loading ? 'Generating...' : 'Generate Proposal'}
// //         </button>
// //       </form>

// //       {error && (
// //         <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
// //           Error: {error}
// //         </div>
// //       )}

// //       {result && (
// //         <div className="mt-4 p-3 bg-gray-50 rounded">
// //           <h3 className="font-semibold mb-2">Proposal Result:</h3>
// //           <pre className="text-xs overflow-auto">
// //             {JSON.stringify(result, null, 2)}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };



// // components/UI/ProposalResult.jsx
// import React from 'react';
// import { FiCheckCircle, FiPackage, FiGlobe, FiDroplet } from 'react-icons/fi';

// export const ProposalResult = ({ result }) => {
//   if (!result) return null;

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
//         <div className="flex items-center space-x-2">
//           <FiCheckCircle className="text-white text-xl" />
//           <h3 className="text-lg font-semibold text-white">Proposal Generated</h3>
//         </div>
//       </div>
      
//       <div className="p-6 space-y-4">
//         <pre className="text-xs overflow-auto bg-gray-50 p-4 rounded">
//           {JSON.stringify(result, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

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
      
      console.log('Proposal response:', response);
      
      // Handle different response formats
      let data = response.data;
      if (data.data) data = data.data;
      
      setResult(data);
      toast.success('Proposal generated successfully!');
    } catch (err) {
      console.error('Proposal error:', err);
      
      let errorMsg = 'Failed to generate proposal';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">B2B Proposal Generator</h1>

      {/* Backend status banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
        <p className="text-sm text-yellow-700">
          ⚡ Backend URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="relative">
          <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="budget"
            placeholder="Budget (₹)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1000"
            required
          />
        </div>
        
        <div className="relative">
          <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="companyType"
            placeholder="Company Type (e.g., Corporate Gifting)"
            value={formData.companyType}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="relative">
          <FiTarget className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="sustainabilityGoals"
            placeholder="Sustainability Goals (comma-separated)"
            value={formData.sustainabilityGoals}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Proposal'
          )}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
      {result && <ProposalResult result={result} />}
    </div>
  );
};