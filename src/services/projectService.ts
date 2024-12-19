import { supabase } from '../lib/supabase';
import { validateAndUploadImage } from './imageService';
import type { Project } from '../types/project';

function validateProjectData(project: any): boolean {
  const requiredFields = [
    'projectName',
    'solutionName',
    'problemDescription',
    'solutionDescription',
    'impact',
    'experts',
    'technicalArea',
    'country',
    'coordinates',
    'contactPoint',
    'owner'
  ];
  
  return requiredFields.every(field => {
    const value = project[field];
    if (field === 'coordinates') {
      return Array.isArray(value) && 
             value.length === 2 && 
             typeof value[0] === 'number' && 
             typeof value[1] === 'number';
    }
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export async function createProject(
  project: Omit<Project, 'id' | 'createdAt' | 'imageUrl'>,
  imageFile?: File
) {
  try {
    if (!validateProjectData(project)) {
      throw new Error('Invalid project data');
    }

    let imageUrl = '';
    if (imageFile) {
      imageUrl = await validateAndUploadImage(imageFile);
    }

    const { error, data } = await supabase
      .from('projects')
      .insert({
        project_name: project.projectName,
        solution_name: project.solutionName,
        problem_description: project.problemDescription,
        solution_description: project.solutionDescription,
        impact: project.impact,
        experts: project.experts,
        technical_area: project.technicalArea,
        country: project.country,
        coordinates: project.coordinates,
        contact_point: project.contactPoint,
        image_url: imageUrl || null,
        tags: project.tags,
        owner: project.owner
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, data: Partial<Project>, imageFile?: File) {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      imageUrl = await validateAndUploadImage(imageFile);
    }

    const { error } = await supabase
      .from('projects')
      .update({
        project_name: data.projectName,
        solution_name: data.solutionName,
        problem_description: data.problemDescription,
        solution_description: data.solutionDescription,
        impact: data.impact,
        experts: data.experts,
        technical_area: data.technicalArea,
        country: data.country,
        coordinates: data.coordinates,
        contact_point: data.contactPoint,
        image_url: imageUrl,
        tags: data.tags
      })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}