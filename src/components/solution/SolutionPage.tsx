import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { SolutionHeader } from './SolutionHeader';
import { SolutionHero } from './SolutionHero';
import { SolutionOverview } from './SolutionOverview';
import { AdoptionGuide } from './AdoptionGuide';
import { Loader2 } from 'lucide-react';

export function SolutionPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, loading } = useProjects();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solution Not Found</h2>
          <p className="text-gray-600">The solution you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SolutionHeader project={project} />
      <SolutionHero project={project} />
      <SolutionOverview project={project} />
      <AdoptionGuide />
    </div>
  );
}