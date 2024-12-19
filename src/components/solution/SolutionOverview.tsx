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
            <div className="text-orange-500 font-medium mb-2">SOLUTION</div>
            <h2 className="text-4xl font-bold mb-4">SMART</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-sm border border-teal-500 text-teal-600">
                Bangladesh
              </span>
              <span className="px-3 py-1 rounded-full text-sm border border-lime-500 text-lime-600">
                Environment and Natural Resources
              </span>
              <span className="px-3 py-1 rounded-full text-sm border border-green-500 text-green-600">
                Biodiversity
              </span>
              <span className="px-3 py-1 rounded-full text-sm border border-orange-500 text-orange-500">
                USAID Protibesh Project
              </span>
              <span className="px-3 py-1 rounded-full text-sm border border-gray-400 text-gray-600">
                Open-source
              </span>
            </div>
            <p className="text-gray-600 text-lg">
              An open-source biodiversity monitoring solution that facilitates systematic recording, analysis, reporting and presentation of conservation data, particularly on biodiversity threats and key species.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-4 mt-12">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full rounded"
                  src="https://www.youtube.com/embed/Y9mzcelmrys"
                  title="SMART Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {/* Title and button row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Overview</h2>
          <button className="text-orange-500 font-medium border border-orange-500 rounded-full px-6 py-2 hover:bg-orange-50">
            View full presentation
          </button>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Problem Description */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 text-orange-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zm-7-3v3m0 0v3m0-3h3m-3 0h-3" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-orange-500 font-medium mb-2">Problem description</h3>
                <p className="text-gray-600">WCS was implementing SMART previously starting in 2015 but nothing about it was sustainable and once they were ending their project in 2018, SMART efforts would end. This was mostly because WCS was hiring their own data collection person to work with the rangers - the govt become too dependent on this</p>
              </div>
            </div>

            {/* Solution Description */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 text-orange-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-orange-500 font-medium mb-2">Solution description</h3>
                <p className="text-gray-600">In order for progress to be achieved on conservation management strategy by govt, Protibesh proposed using SMART for conservation data collection in more sustainable ways by providing technical support and mentorship to govt rangers and officials to carry on SMART use long after the current USAID project.</p>
              </div>
            </div>

            {/* Impact */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 text-green-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-green-500 font-medium mb-2">Impact</h3>
                <p className="text-gray-600">With SMART, protected area managers in Bangladesh can now actively track biodiversity threats and keep a closer watch on the health of wildlife populations - currently being implemented in 4 sites with plans to scale.</p>
              </div>
            </div>

            {/* Experts */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 text-blue-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-blue-500 font-medium mb-2">Experts</h3>
                <p className="text-gray-600">
                  <strong>Solution Expert:</strong> Sahadeb Majumder, Environmental and Monitoring Specialist, USAID Protibesh Project<br />
                  <strong>Chemonics Expert:</strong> Felix Gaschick, Chief of Party, USAID Protibesh Project
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-100 rounded-lg p-4">
              <img 
                src="/api/placeholder/600/400" 
                alt="SMART Components"
                className="w-full rounded mb-4"
              />
              <img 
                src="/api/placeholder/600/400" 
                alt="SMART Integration"
                className="w-full rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}