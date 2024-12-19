// Panel height configurations
export const PANEL_HEIGHTS = {
  DEFAULT: 'h-[320px]',
  DEMOCRACY: 'h-[320px]',
  AGRICULTURE: 'h-[320px]',
  EDUCATION: 'h-[320px]',
  ENERGY: 'h-[320px]'
} as const;

// Panel width configurations
export const PANEL_WIDTHS = {
  DEFAULT: 'w-[340px]',
  DEMOCRACY: 'w-[300px]',
  AGRICULTURE: 'w-[339px]',
  EDUCATION: 'w-[339px]',
  ENERGY: 'w-[300px]'
} as const;

// Category to configuration mapping
export const PANEL_CONFIGS = {
  'Agriculture and Food Security': 'AGRICULTURE',
  'Democracy and Governance': 'DEMOCRACY',
  'Education': 'EDUCATION',
  'Sustainable Energy Transition': 'ENERGY'
} as const;