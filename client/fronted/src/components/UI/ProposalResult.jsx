

import React from 'react';
import { FiCheckCircle, FiPackage, FiGlobe, FiDroplet, FiMapPin } from 'react-icons/fi';

export const ProposalResult = ({ result }) => {
  if (!result) return null;

  const ImpactCard = ({ icon: Icon, label, value, unit, color }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <Icon className={`text-2xl ${color} mx-auto mb-2`} />
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-800">
        {value} <span className="text-xs font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center space-x-2">
          <FiCheckCircle className="text-white text-xl" />
          <h3 className="text-lg font-semibold text-white">Proposal Generated</h3>
        </div>
        <p className="text-blue-100 text-sm mt-1">ID: {result.proposalId}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Budget Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="text-lg font-bold text-gray-800">₹{result.budget?.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-xs text-green-600 mb-1">Total Cost</p>
            <p className="text-lg font-bold text-green-600">₹{result.totalCost?.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-xs text-blue-600 mb-1">Remaining</p>
            <p className="text-lg font-bold text-blue-600">₹{result.budgetRemaining?.toLocaleString()}</p>
          </div>
        </div>

        {/* Product Mix */}
        {result.productMix?.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FiPackage className="text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Product Mix</p>
            </div>
            <div className="space-y-2">
              {result.productMix.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity} units × ₹{item.unitPrice}</p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{item.total}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact Summary */}
        {result.impactSummary && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Environmental Impact</p>
            <div className="grid grid-cols-3 gap-3">
              <ImpactCard
                icon={FiDroplet}
                label="Plastic Saved"
                value={result.impactSummary.plasticSavedKg}
                unit="kg"
                color="text-blue-500"
              />
              <ImpactCard
                icon={FiGlobe}
                label="CO₂ Avoided"
                value={result.impactSummary.carbonAvoidedKg}
                unit="kg"
                color="text-green-500"
              />
              <ImpactCard
                icon={FiMapPin}
                label="Local Sourcing"
                value={result.impactSummary.localSourcingPercent}
                unit="%"
                color="text-purple-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};