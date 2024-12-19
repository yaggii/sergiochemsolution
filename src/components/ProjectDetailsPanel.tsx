import React, { useState } from 'react';
import { X, MapPin, Tag, User, Calendar, CheckCircle2, Edit2, Trash2, Users, Target, AlertCircle } from 'lucide-react';
import type { Project } from '../types/project';
import { useAuth } from '../contexts/AuthContext';
import { EditProjectForm } from './EditProjectForm';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { deleteProject } from '../services/projectService';
import toast from 'react-hot-toast';

interface ProjectDetailsPanelProps {
  project: Project;
  onClose: () => void;
  onUpdate?: (updatedProject: Project) => void;
  onDelete?: () => void;
}

export function ProjectDetailsPanel({ project, onClose, onUpdate, onDelete }: ProjectDetailsPanelProps) {
  const { user } = useAuth();
  const isOwner = user?.id === project.owner;
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleProjectUpdate = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
    if (onUpdate) {
      onUpdate(updatedProject);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(currentProject.id);
      toast.success('Solution deleted successfully');
      if (onDelete) {
        onDelete();
      }
      onClose();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete solution');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  if (isEditing) {
    return (
      <EditProjectForm
        project={currentProject}
        onClose={() => setIsEditing(false)}
        onSave={handleProjectUpdate}
      />
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
          <div className="p-6 border-b flex items-center justify-between bg-orange-50">
            <div>
              <h3 className="font-bold text-2xl text-gray-900">{currentProject.solutionName}</h3>
              <p className="text-gray-600">{currentProject.projectName}</p>
            </div>
            <div className="flex items-center gap-4">
              {isOwner && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                    aria-label="Edit project"
                  >
                    <Edit2 className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                    aria-label="Delete project"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-6 h-6 text-red-500" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {currentProject.imageUrl && (
              <div className="relative h-80 overflow-hidden">
                <img
                  src={currentProject.imageUrl}
                  alt={currentProject.solutionName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    {currentProject.technicalArea}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 space-y-8">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentProject.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{currentProject.contactPoint}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(currentProject.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Problem
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentProject.problemDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3">Solution</h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentProject.solutionDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Impact
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentProject.impact}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Experts
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentProject.experts}
                </p>
              </div>

              {currentProject.tags.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xl font-semibold mb-3">Location</h4>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Coordinates: {currentProject.coordinates[0].toFixed(4)}, {currentProject.coordinates[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Owner</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          title="Delete Solution"
          message="Are you sure you want to delete this solution? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </>
  );
}