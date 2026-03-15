import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              About
            </h3>
            <p className="text-gray-500 text-sm">
              AI-powered platform for sustainable product categorization and B2B proposal generation.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Technologies
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>NestJS Backend</li>
              <li>React + Vite Frontend</li>
              <li>Gemini AI</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/category" className="text-green-600 hover:text-green-700">
                  Category Generator
                </a>
              </li>
              <li>
                <a href="/proposal" className="text-green-600 hover:text-green-700">
                  Proposal Generator
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © 2024 EcoAI Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};