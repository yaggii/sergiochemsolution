import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';
import type { Database } from '../types/database';

type SupabaseProject = Database['public']['Tables']['projects']['Row'];

function mapSupabaseProject(project: SupabaseProject): Project {
  return {
    id: project.id,
    projectName: project.project_name,
    solutionName: project.solution_name,
    solutionDescription: project.solution_description,
    technicalArea: project.technical_area,
    country: project.country,
    coordinates: project.coordinates,
    contactPoint: project.contact_point,
    imageUrl: project.image_url || undefined,
    tags: project.tags,
    createdAt: new Date(project.created_at).getTime(),
    owner: project.owner
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProjects(data.map(mapSupabaseProject));
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Subscribe to changes
    const channel = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { projects, loading, error };
}