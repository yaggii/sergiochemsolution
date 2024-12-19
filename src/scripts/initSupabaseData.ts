import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://awuzjquzzwvnimhnxywr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dXpqcXV6end2bmltaG54eXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4OTE2NjUsImV4cCI6MjA0OTQ2NzY2NX0.eUDmkIx4eWN-1mGxT8CiFMyUaEmFPmJawObEsM0MKAU';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const sampleProjects = [
  {
    project_name: 'SMART Conservation',
    solution_name: 'SMART',
    problem_description: 'Biodiversity monitoring and protection faces significant challenges due to limited resources and inefficient data collection methods.',
    solution_description: 'Spatial Monitoring and Reporting Tool - A solution that facilitates systematic monitoring, analysis, reporting and tracking of biodiversity threats.',
    impact: 'Improved conservation effectiveness across multiple protected areas, with measurable increases in wildlife populations and reduced illegal activities.',
    experts: 'Dr. Jane Smith (Conservation Biology), Prof. John Doe (GIS Specialist), Sarah Johnson (Wildlife Management)',
    technical_area: 'Agriculture and Food Security',
    country: 'Bangladesh',
    coordinates: [23.685, 90.3563],
    contact_point: 'John Doe',
    image_url: 'https://images.unsplash.com/photo-1586325194227-7625ed95172b?auto=format&fit=crop&w=600&q=80',
    tags: ['conservation', 'biodiversity', 'monitoring'],
    owner: 'system'
  },
  {
    project_name: 'LAWIN Forest Protection',
    solution_name: 'LAWIN',
    problem_description: 'Traditional forest monitoring methods are time-consuming and often fail to detect threats in time for effective intervention.',
    solution_description: 'A comprehensive forest protection system that facilitates systematic recording, analysis, reporting, and preservation of biodiversity.',
    impact: 'Reduced deforestation rates by 45% in pilot areas, improved response time to forest threats by 60%.',
    experts: 'Maria Garcia (Forestry Expert), Dr. James Wilson (Environmental Science), Dr. Lisa Chen (Data Analytics)',
    technical_area: 'Agriculture and Food Security',
    country: 'Philippines',
    coordinates: [12.8797, 121.7740],
    contact_point: 'Jane Smith',
    image_url: 'https://images.unsplash.com/photo-1612957824445-35b3f486b21e?auto=format&fit=crop&w=600&q=80',
    tags: ['forest', 'protection', 'biodiversity'],
    owner: 'system'
  },
  {
    project_name: 'Solar Battery Network',
    solution_name: 'Solar PV Charged Battery',
    problem_description: 'Limited access to reliable electricity infrastructure hinders the adoption of electric vehicles in rural areas.',
    solution_description: 'Network of battery swapping stations powered by solar PV and connected to the grid to support electric vehicles.',
    impact: 'Enabled 500+ electric vehicles to operate in rural areas, reducing CO2 emissions by 1200 tons annually.',
    experts: 'Dr. Robert Chang (Renewable Energy), Emma Martinez (Electric Vehicle Systems), Dr. Michael Lee (Power Systems)',
    technical_area: 'Digital Development',
    country: 'Sri Lanka',
    coordinates: [7.8731, 80.7718],
    contact_point: 'Sarah Johnson',
    image_url: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&w=600&q=80',
    tags: ['solar', 'energy', 'sustainability'],
    owner: 'system'
  }
];

export async function initializeSupabaseData() {
  try {
    // First, run the schema update
    const schemaSQL = `
      alter table projects 
      add column if not exists problem_description text not null default '',
      add column if not exists impact text not null default '',
      add column if not exists experts text not null default '';
    `;

    await supabase.rpc('exec_sql', { sql: schemaSQL });

    // Then insert the sample data
    const { error } = await supabase
      .from('projects')
      .insert(sampleProjects);

    if (error) throw error;
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
    throw error;
  }
}

// Run the initialization
// Only run this once to seed the database
// initializeSupabaseData();