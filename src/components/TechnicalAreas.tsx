import React from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, X, MapPin, Tag } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { CATEGORIES } from '../types';
import { useProjects } from '../hooks/useProjects';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';
import type { Project } from '../types/project';

const areaImages = {
  'Agriculture and Food Security': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80',
  'Democracy and Governance': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=80',
  'Digital Development': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80',
  'Economic Growth and Trade': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
  'Education': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80',
  'Environment and Natural Resources': 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80',
  'Gender Equality and Social Inclusion': 'https://images.unsplash.com/photo-1573497161529-95cc285b9c90?auto=format&fit=crop&w=1920&q=80',
  'Health Practice': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1920&q=80',
  'Peace Stability and Transition': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=80',
  'Private Sector Engagement': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80',
  'Supply Chain': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
  'Sustainable Energy Transition': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80',
  'Water and Sustainable Cities': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80'
} as const;

// Rest of the file remains unchanged...