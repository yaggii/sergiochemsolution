import React from 'react';
import { SearchBar } from './SearchBar';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex gap-12 items-start justify-between">
          <div className="flex-1">
            <h3 className="text-orange-500 font-medium mb-4">WELCOME TO THE</h3>
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Solutions<br />
              Exchange
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              A by-project, for-project platform featuring high-impact solutions that are accessible and adoption ready.
            </p>
          </div>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}