
import { useState } from 'react';
import { generateCategories, generateProposal } from '../services/api';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCategoriesWithAI = async (productDescription, productName, industry) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateCategories({
        productDescription,
        productName,
        industry,
      });
      
      return result;
    } catch (err) {
      setError(err.message || 'Failed to generate categories');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateProposalWithAI = async (proposalData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateProposal(proposalData);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to generate proposal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateCategories: generateCategoriesWithAI,
    generateProposal: generateProposalWithAI,
    loading,
    error,
  };
};