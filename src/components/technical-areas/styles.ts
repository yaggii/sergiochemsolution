import type { Category } from '../../types';

export const getPanelClasses = (area: Category): string => {
  if (area === 'Democracy and Governance') {
    return 'col-span-2';
  }
  return '';
};

export const getGridClasses = (area: Category): string => {
  switch (area) {
    case 'Democracy and Governance':
      return 'flex-[0_0_40%]';
    case 'Agriculture and Food Security':
    case 'Education':
      return 'flex-[0_0_45%]';
    case 'Sustainable Energy Transition':
      return 'flex-[0_0_40%]'; // Adjusted for 300px width
    default:
      return 'flex-[0_0_50%]';
  }
};