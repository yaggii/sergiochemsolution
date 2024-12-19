import React, { useState } from 'react';
import { X, MapPin, Tag } from 'lucide-react';
import type { Project } from '../types/project';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';

interface SearchResultsProps {
  results: Project[];
  searchQuery: string;
  onClose: () => void;
}

export function SearchResults({ results, searchQuery, onClose }: SearchResultsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
            <p className="text-gray-600">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search results"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for your search.</p>
              <p className="text-gray-400">Try different keywords or browse our technical areas.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {results.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex gap-6">
                    {project.imageUrl && (
                      <div className="flex-shrink-0">
                        <img
                          src={project.imageUrl}
                          alt={project.solutionName}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {project.solutionName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {project.projectName}
                          </p>
                        </div>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                          {project.technicalArea}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        {project.solutionDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{project.country}</span>
                        </div>
                        {project.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <div className="flex gap-2">
                              {project.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}