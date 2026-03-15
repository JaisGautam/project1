import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export const RecentItems = () => {
  const [categories, setCategories] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, props] = await Promise.all([
          api.getRecentCategories(),
          api.getRecentProposals()
        ]);
        setCategories(cats);
        setProposals(props);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Recent Categories</h3>
          {categories.map((cat: any) => (
            <div key={cat._id} className="mb-2 p-2 border rounded">
              <p><strong>{cat.productName}</strong> - {cat.primaryCategory}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Recent Proposals</h3>
          {proposals.map((prop: any) => (
            <div key={prop._id} className="mb-2 p-2 border rounded">
              <p><strong>{prop.companyType}</strong> - ₹{prop.budget}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};