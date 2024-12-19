import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { useProjects } from '../hooks/useProjects';
import { Loader2, X } from 'lucide-react';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';
import type { Project } from '../types/project';

const DEFAULT_CENTER: LatLngTuple = [20, 0];
const DEFAULT_ZOOM = 2;

function MapController({ selectedLocation }: { selectedLocation: LatLngTuple | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation, 6);
    } else {
      map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [selectedLocation, map]);

  return null;
}

const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function WorldMap() {
  const { projects, loading, error } = useProjects();
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
        <p className="font-medium">Error loading projects</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Group projects by country
  const projectsByCountry = projects.reduce((acc, project) => {
    const key = project.country;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const handleCountryClick = (country: string, coordinates: LatLngTuple) => {
    setSelectedLocation(coordinates);
    setSelectedCountry(country);
    setSelectedProject(null);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section className="flex flex-wrap items-center mb-16">
      {/* Header */}
      <div className="w-full text-left mb-2">
        <h3 className="text-lg text-lime-600 uppercase tracking-wider mb-2">View</h3>
      </div>

      {/* Solutions by Country and Dynamic Counters */}
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-4xl font-semibold text-gray-900">Solutions by Country</h2>
        <div className="flex gap-4">
        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-lg">
          {projects.length} Solutions
        </span>
          <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-lg">
            {Object.keys(projectsByCountry).length} Countries
          </span>
          <span className="bg-lime-500 text-white px-4 py-1 rounded-full text-lg">
            {new Set(projects.map((p) => p.technicalArea)).size} Technical Areas
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-lg bg-[#E6F4F1] shadow-md" style={{ height: '600px' }}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="w-full h-full rounded-lg"
          minZoom={2}
          maxBounds={[[-90, -180], [90, 180]]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController selectedLocation={selectedLocation} />
          {projects.map((project) => (
            <Marker
              key={project.id}
              position={project.coordinates as LatLngTuple}
              icon={customIcon}
              eventHandlers={{
                click: () => handleCountryClick(project.country, project.coordinates as LatLngTuple),
              }}
            >
              <Popup>
                <p className="font-medium text-center">{project.country}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Country Panel */}
        {selectedCountry && (
          <div className="absolute top-4 right-4 bg-white w-80 rounded-lg shadow-lg z-[1000] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-orange-50">
              <h3 className="font-bold text-lg text-gray-800">{selectedCountry}</h3>
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  setSelectedLocation(null);
                }}
                className="p-2 rounded-full hover:bg-orange-200 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {projectsByCountry[selectedCountry]?.map((project) => (
                <div
                  key={project.id}
                  className="cursor-pointer p-3 border rounded-lg hover:shadow transition-shadow bg-white"
                  onClick={() => handleProjectClick(project)}
                >
                  <h4 className="font-semibold text-sm mb-1">{project.solutionName}</h4>
                  <p className="text-xs text-gray-500">{project.projectName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Panel */}
        {selectedProject && (
          <ProjectDetailsPanel
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
