import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';
import { getValidImageUrl } from '../utils/imageUtils';
import type { Project } from '../types/project';
import '../css/styles.css';

export function HighlightedSolutions() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Get the 3 most recent projects
  const highlightedProjects = projects.slice(0, 3);

  return (
    <section className="mb-16">
      <div className="text-left mb-8">
        <h3 className="text-orange-500 uppercase text-lg tracking-wider mb-2">DISCOVER</h3>
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-4xl font-semibold text-gray-900">Highlighted Solutions</h2>
          <button className="bg-white border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors">
            See All Solutions
          </button>
        </div>
        <p className="text-gray-600 font-normal text-lg mt-1">Discover solutions around the world</p>
        <p className="text-gray-600 font-normal text-lg mt-1">that are scaling with Chemonics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlightedProjects.map((project) => (
          <div 
            key={project.id} 
            className="group cursor-pointer w-[340px]"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-[340px] mb-4 overflow-hidden rounded-image">
              <img
                src={getValidImageUrl(project.imageUrl)}
                alt={project.solutionName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm">
                {project.technicalArea}
              </span>
            </div>
            <h3 className="font-bold text-xl mb-2 group-hover:text-orange-500 transition-colors">
              {project.solutionName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{project.country}</p>
            <p className="text-gray-700 line-clamp-2">{project.solutionDescription}</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}