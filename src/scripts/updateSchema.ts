import { supabase } from '../lib/supabase';

export async function updateSchema() {
  const schemaSQL = `
    -- Add new columns to the projects table
    alter table projects 
    add column if not exists problem_description text not null default '',
    add column if not exists impact text not null default '',
    add column if not exists experts text not null default '';

    -- Update existing rows to have default values
    update projects 
    set 
      problem_description = solution_description,
      impact = 'Impact information not available',
      experts = 'Experts information not available'
    where problem_description = '';
  `;

  try {
    // Execute the SQL using Supabase's stored procedure
    const { error } = await supabase.rpc('exec_sql', { sql: schemaSQL });
    
    if (error) throw error;
    console.log('Schema updated successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
}

// Run the schema update
updateSchema().catch(console.error);