import React from 'react';
import { areaImages } from './AreaImages';
import { PANEL_HEIGHTS, PANEL_WIDTHS, PANEL_CONFIGS } from './constants';
import { getValidImageUrl } from '../../utils/imageUtils';
import { getGridClasses } from './styles';
import type { Category } from '../../types';

interface TechnicalAreaCardProps {
  area: Category;
  onClick: () => void;
}

export function TechnicalAreaCard({ area, onClick }: TechnicalAreaCardProps) {
  const config = PANEL_CONFIGS[area as keyof typeof PANEL_CONFIGS];
  const heightClass = config ? PANEL_HEIGHTS[config] : PANEL_HEIGHTS.DEFAULT;
  const widthClass = config ? PANEL_WIDTHS[config] : PANEL_WIDTHS.DEFAULT;
  const gridClass = getGridClasses(area);

  return (
    <div
      className={`relative ${gridClass} min-w-0 cursor-pointer overflow-hidden px-2 mb-4 ${heightClass} ${widthClass}`}
      onClick={onClick}
    >
      <div className="relative h-full rounded-image overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src={getValidImageUrl(areaImages[area])}
            alt={area}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
            {area}
          </h3>
        </div>
      </div>
    </div>
  );
}