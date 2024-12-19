export interface Solution {
  id: string;
  title: string;
  description: string;
  category: string;
  geography: string;
  image: string;
  tags: string[];
}

export const CATEGORIES = [
  'Agriculture and Food Security',
  'Democracy and Governance',
  'Digital Development',
  'Economic Growth and Trade',
  'Education',
  'Environment and Natural Resources',
  'Gender Equality and Social Inclusion',
  'Health Practice',
  'Peace Stability and Transition',
  'Private Sector Engagement',
  'Supply Chain', 
  'Sustainable Energy Transition',
  'Water and Sustainable Cities'
] as const;

export const GEOGRAPHIES = [
  'Bangladesh',
  'Colombia',
  'Philippines',
  'South Africa',
  'Sri Lanka'
] as const;