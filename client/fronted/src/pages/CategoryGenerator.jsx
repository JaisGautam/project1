
// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { FiTag, FiLoader } from 'react-icons/fi';
// import { categoryAPI } from '../services/api';
// import CategoryResult from '../components/UI/CategoryResult';
// import { ErrorMessage } from '../components/common/ErrorMessage';
// import ProposalResult from '../components/UI/ProposalResult';

// import CategoryResult from '../components/UI/CategoryResult';
// export const Category = () => {
//   const [formData, setFormData] = useState({ productName: '', description: '' });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.productName.trim() || !formData.description.trim()) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await categoryAPI.generate(formData);
//       setResult(response.data);
//       toast.success('Category generated successfully!');
//     } catch (err) {
//       setError('Failed to generate category');
//       toast.error('Failed to generate category');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold text-center">AI Category Generator</h1>
      
//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={formData.productName}
//           onChange={(e) => setFormData({...formData, productName: e.target.value})}
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           rows="4"
//           value={formData.description}
//           onChange={(e) => setFormData({...formData, description: e.target.value})}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
//         >
//           {loading ? <FiLoader className="animate-spin" /> : 'Generate Category'}
//         </button>
//       </form>

//       {error && <ErrorMessage message={error} />}
//       {result && <CategoryResult result={result} />}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { categoryAPI } from '../services/api';
import CategoryResult from '../components/ui/CategoryResult';
import { ErrorMessage } from '../components/common/ErrorMessage';

export const Category = () => {
  const [formData, setFormData] = useState({ productName: '', description: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName.trim() || !formData.description.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await categoryAPI.generate(formData);
      setResult(response.data);
      toast.success('Category generated successfully!');
    } catch (err) {
      setError('Failed to generate category');
      toast.error('Failed to generate category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">AI Category Generator</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <FiLoader className="animate-spin" /> : 'Generate Category'}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
      {result && <CategoryResult result={result} />}
    </div>
  );
};