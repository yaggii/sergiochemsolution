import React from 'react';
import { Check } from 'lucide-react';

// const ADOPTION_STEPS = [
//   { id: 1, title: 'Activity Start-up & Pilot' },
//   { id: 2, title: 'Implementation' },
//   { id: 3, title: 'Scale & Sustainability' },
//   { id: 4, title: 'Lessons Learned' },
//   { id: 5, title: 'Adaptations to Date' }
// ];


export function AdoptionGuide() {

 const steps = [
      "Activity Start-up & Pilot",
      "Implementation",
      "Scale & Sustainability",
      "Lessons Learned",
      "Adaptations to Date"
    ];

    
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Adoption Guide</h2>
        
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium max-w-[100px]">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="h-0.5 flex-1 bg-orange-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Process</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">1</span>
                <span className="text-gray-600">Process Map</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</span>
                <span className="text-gray-600">Implementation Guide</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Phase documents</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">1</span>
                <span className="text-gray-600">SMART Technical Manual (Bengali)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</span>
                <span className="text-gray-600">SMART Data Analysis Guide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}