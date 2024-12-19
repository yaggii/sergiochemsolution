import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CATEGORIES } from '../../types';
import { useProjects } from '../../hooks/useProjects';
import { ProjectDetailsPanel } from '../ProjectDetailsPanel';
import { TechnicalAreaCard } from './TechnicalAreaCard';
import { AreaProjects } from './AreaProjects';
import type { Project } from '../../types/project';

export function TechnicalAreas() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 2,
    draggable: true
  });

  const handleAreaClick = (area: string) => {
    setSelectedArea(area);
    setSelectedProject(null);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const filteredProjects = selectedArea
    ? projects.filter(project => project.technicalArea === selectedArea)
    : [];

  // Create pairs of categories for 2x2 grid
  const categoryPairs = CATEGORIES.reduce<Category[][]>((acc, category, index) => {
    if (index % 4 === 0) {
      acc.push([category]);
    } else {
      acc[Math.floor(index / 4)].push(category);
    }
    return acc;
  }, []);

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4 w-full">
        <div>
          <h2 className="text-lg text-lime-600 uppercase tracking-wider mb-2">Explore</h2>
          <p className="text-4xl font-semibold text-gray-900">Technical Areas</p>
        </div>
        <button className="bg-white border border-lime-600 text-lime-600 px-6 py-2 rounded-full hover:bg-lime-50 transition-colors">
          See All Technical Areas
        </button>
      </div>

      <div className="relative">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {categoryPairs.map((pair, pairIndex) => (
              <div key={pairIndex} className="flex-[0_0_100%] min-w-0 flex flex-wrap">
                {pair.map((area) => (
                  <TechnicalAreaCard
                    key={area}
                    area={area}
                    onClick={() => handleAreaClick(area)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedArea && !selectedProject && (
        <AreaProjects 
          projects={filteredProjects}
          area={selectedArea}
          onClose={() => setSelectedArea(null)}
          onProjectClick={handleProjectClick}
        />
      )}

      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}