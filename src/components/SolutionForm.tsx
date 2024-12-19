import React, { useState, ChangeEvent } from 'react';
import { ArrowLeft, Upload, Search, Check, AlertCircle, User } from 'lucide-react';
import { createProject } from '../services/projectService';
import { ImageValidationError } from '../services/imageService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { CATEGORIES } from '../types';
import { countryCoordinates } from '../utils/countries';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp'
];

export function SolutionForm({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    projectCountry: '',
    contactPoint: '',
    solutionName: '',
    problemDescription: '',
    solutionDescription: '',
    impact: '',
    experts: '',
    technicalArea: CATEGORIES[0],
    tags: [] as string[]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState('');

  const filteredCountries = countrySearch
    ? Object.keys(countryCoordinates).filter(country =>
        country.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : Object.keys(countryCoordinates);

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, projectCountry: country }));
    setCountrySearch('');
    setShowCountryDropdown(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setImageError('Please upload a valid image file (JPEG, PNG, GIF, WebP, SVG, or BMP)');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setImageError('Image must be smaller than 10MB');
      return;
    }

    setImageFile(file);
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectCountry || !countryCoordinates[formData.projectCountry]) {
      toast.error('Please select a valid country');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to submit a solution');
      return;
    }

    if (imageError) {
      toast.error('Please fix the image errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        projectName: formData.projectName.trim(),
        solutionName: formData.solutionName.trim(),
        problemDescription: formData.problemDescription.trim(),
        solutionDescription: formData.solutionDescription.trim(),
        impact: formData.impact.trim(),
        experts: formData.experts.trim(),
        technicalArea: formData.technicalArea,
        country: formData.projectCountry,
        coordinates: countryCoordinates[formData.projectCountry],
        contactPoint: formData.contactPoint.trim(),
        tags: formData.tags,
        owner: user.id
      };

      await createProject(projectData, imageFile);
      toast.success('Solution submitted successfully!');
      onBack();
    } catch (error) {
      console.error('Error submitting solution:', error);
      if (error instanceof ImageValidationError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to submit solution. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Solution</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  required
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="relative">
                <label htmlFor="countrySearch" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="countrySearch"
                    value={countrySearch}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setShowCountryDropdown(true);
                    }}
                    onFocus={() => setShowCountryDropdown(true)}
                    placeholder="Search countries..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {formData.projectCountry && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {formData.projectCountry}
                    </span>
                  </div>
                )}

                {showCountryDropdown && filteredCountries.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                    {filteredCountries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        className={`w-full text-left px-4 py-2 hover:bg-orange-50 flex items-center justify-between ${
                          formData.projectCountry === country ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                        }`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span>{country}</span>
                        {formData.projectCountry === country && (
                          <Check className="w-4 h-4 text-orange-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="solutionName" className="block text-sm font-medium text-gray-700 mb-1">
                  Solution Name
                </label>
                <input
                  type="text"
                  id="solutionName"
                  name="solutionName"
                  required
                  value={formData.solutionName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="contactPoint" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPoint"
                  name="contactPoint"
                  required
                  value={formData.contactPoint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                  Solution Owner
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div>
                <label htmlFor="technicalArea" className="block text-sm font-medium text-gray-700 mb-1">
                  Technical Area
                </label>
                <select
                  id="technicalArea"
                  name="technicalArea"
                  required
                  value={formData.technicalArea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Description
                </label>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  required
                  value={formData.problemDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe the problem this solution addresses..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="solutionDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Solution Description
                </label>
                <textarea
                  id="solutionDescription"
                  name="solutionDescription"
                  required
                  value={formData.solutionDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe how your solution works..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                  Impact
                </label>
                <textarea
                  id="impact"
                  name="impact"
                  required
                  value={formData.impact}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe the impact of your solution..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="experts" className="block text-sm font-medium text-gray-700 mb-1">
                  Experts
                </label>
                <textarea
                  id="experts"
                  name="experts"
                  required
                  value={formData.experts}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="List the experts involved in this solution..."
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Solution Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {imageFile ? imageFile.name : 'Upload image'}
                  </span>
                </label>
                {imageError && (
                  <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {imageError}
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: JPEG, PNG, GIF, WebP, SVG, BMP (max 10MB)
                </p>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (Press Enter to add)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleAddTag}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Type and press Enter to add tags"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Solution'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}