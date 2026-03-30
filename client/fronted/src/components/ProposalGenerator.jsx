// import React, { useState } from 'react';

// const API_BASE_URL = 'http://localhost:5000';

// export const ProposalGenerator = () => {
//   const [budget, setBudget] = useState(50000);
//   const [companyType, setCompanyType] = useState('');
//   const [goals, setGoals] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     const goalsArray = goals.split(',').map(g => g.trim()).filter(g => g);

//     try {
//       const response = await fetch(`${API_BASE_URL}/proposal/generate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           budget: Number(budget), 
//           companyType, 
//           sustainabilityGoals: goalsArray 
//         }),
//       });
      
//       if (!response.ok) throw new Error('API call failed');
      
//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">📝 AI B2B Proposal Generator</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label className="block text-sm font-medium mb-1">Budget (₹)</label>
//           <input
//             type="number"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             className="w-full p-2 border rounded"
//             min="1000"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Type</label>
//           <input
//             type="text"
//             value={companyType}
//             onChange={(e) => setCompanyType(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="e.g., Corporate Gifting"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Sustainability Goals (comma-separated)</label>
//           <input
//             type="text"
//             value={goals}
//             onChange={(e) => setGoals(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="plastic-free, local-sourcing"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
//         >
//           {loading ? 'Generating...' : 'Generate Proposal'}
//         </button>
//       </form>

//       {error && (
//         <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
//           Error: {error}
//         </div>
//       )}

//       {result && (
//         <div className="mt-4 p-3 bg-gray-50 rounded">
//           <h3 className="font-semibold mb-2">Proposal Result:</h3>
//           <pre className="text-xs overflow-auto">
//             {JSON.stringify(result, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };



// components/UI/ProposalResult.jsx
import React from 'react';
import { FiCheckCircle, FiPackage, FiGlobe, FiDroplet } from 'react-icons/fi';

export const ProposalResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-2">
          <FiCheckCircle className="text-white text-xl" />
          <h3 className="text-lg font-semibold text-white">Proposal Generated</h3>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <pre className="text-xs overflow-auto bg-gray-50 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
};