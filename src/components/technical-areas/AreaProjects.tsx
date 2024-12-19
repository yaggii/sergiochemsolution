import React from 'react';
import { X, MapPin, Tag } from 'lucide-react';
import type { Project } from '../../types/project';

interface AreaProjectsProps {
  projects: Project[];
  area: string;
  onClose: () => void;
  onProjectClick: (project: Project) => void;
}

export function AreaProjects({ projects, area, onClose, onProjectClick }: AreaProjectsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between bg-orange-50">
          <div>
            <h3 className="font-bold text-xl text-gray-900">{area}</h3>
            <p className="text-sm text-gray-600">
              {projects.length} Solution{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onProjectClick(project)}
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
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">
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
                            {project.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 2 && (
                              <span className="text-gray-500">
                                +{project.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}