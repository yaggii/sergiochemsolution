import React from 'react';
import { Users, Target, AlertCircle } from 'lucide-react';
import type { Project } from '../../types/project';

interface SolutionOverviewProps {
  project: Project;
}

export function SolutionOverview({ project }: SolutionOverviewProps) {
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Problem description</h3>
                  <p className="text-gray-600">Worker safety standards vary across working groups...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Solution description</h3>
                  <p className="text-gray-600">SMART provides an innovative management approach...</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute right-0 top-0">
              <button className="text-orange-500 font-medium">View full presentation</button>
            </div>
            <div className="bg-gray-100 rounded-3xl p-4 mt-12">
              <div className="relative w-[570px] h-[320px]">
                <iframe
                  className="w-full h-full rounded-3xl"
                  src="https://www.youtube.com/embed/Y9mzcelmrys?vq=hd720&rel=0&modestbranding=1"
                  title="SMART Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}