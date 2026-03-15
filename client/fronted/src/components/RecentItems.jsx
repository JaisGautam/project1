import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export const RecentItems = () => {
  const [categories, setCategories] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, propsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/category/recent`),
          fetch(`${API_BASE_URL}/proposal/recent`)
        ]);

        if (!catsRes.ok || !propsRes.ok) throw new Error('Failed to fetch');
        
        const cats = await catsRes.json();
        const props = await propsRes.json();
        
        setCategories(cats);
        setProposals(props);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📋 Recent Items</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-blue-600">Recent Categories</h3>
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories yet</p>
          ) : (
            categories.map((cat, idx) => (
              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded text-sm">
                <p><span className="font-medium">{cat.productName}</span></p>
                <p className="text-gray-600">{cat.primaryCategory} → {cat.subCategory}</p>
              </div>
            ))
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-green-600">Recent Proposals</h3>
          {proposals.length === 0 ? (
            <p className="text-gray-500">No proposals yet</p>
          ) : (
            proposals.map((prop, idx) => (
              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded text-sm">
                <p><span className="font-medium">{prop.companyType}</span></p>
                <p className="text-gray-600">Budget: ₹{prop.budget}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};