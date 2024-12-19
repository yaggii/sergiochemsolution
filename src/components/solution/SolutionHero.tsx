import React from 'react';
import { SearchBar } from './SearchBar';
import type { Project } from '../../types/project';

interface SolutionHeaderProps {
    project: Project;
    onSubmitClick: () => void;
  }

export function SolutionHero({project}) {
  return (
    <div className="relative h-[300px]">
      <img 
        src={project.imageUrl} 
        alt={project.solutionName}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent">
        <div className="container mx-auto px-8 h-full flex flex-col justify-end pb-8">
          <div className="text-white">
            <div className="flex gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {project.technicalArea}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {project.country}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{project.solutionName}</h1>
            <h2 className="text-xl opacity-90">{project.projectName}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}


