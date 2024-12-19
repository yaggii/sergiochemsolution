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