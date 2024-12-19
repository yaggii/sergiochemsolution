import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';
import { SearchResults } from './SearchResults';
import { useProjects } from '../hooks/useProjects';


export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { projects } = useProjects();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  const handleClose = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  const filteredProjects = projects.filter(project => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      project.projectName.toLowerCase().includes(searchTerm) ||
      project.solutionName.toLowerCase().includes(searchTerm) ||
      project.solutionDescription.toLowerCase().includes(searchTerm) ||
      project.technicalArea.toLowerCase().includes(searchTerm) ||
      project.country.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-lg text-orange-500 mb-4">Please enter a problem you're seeking to solve</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., agriculture"
              className="w-full px-6 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 text-lg"
            />
          </div>
          <div className="flex text-sm items-center text-orange-500">
            <Sliders className="mr-2" />
            <span>Advance Search</span>
          </div>
          <button 
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>
      </div>

      {isSearching && (
        <SearchResults 
          results={filteredProjects}
          searchQuery={searchQuery}
          onClose={handleClose}
        />
      )}
    </>
  );
}