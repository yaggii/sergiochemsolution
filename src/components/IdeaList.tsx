import React from 'react';
import { MapPin, Tag } from 'lucide-react';
import type { Idea } from '../types';

interface IdeaListProps {
  ideas: Idea[];
}

export function IdeaList({ ideas }: IdeaListProps) {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No ideas yet. Be the first to share one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{idea.title}</h3>
          <p className="text-gray-600 mb-4">{idea.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{idea.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{idea.geography}</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            {new Date(idea.timestamp).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}