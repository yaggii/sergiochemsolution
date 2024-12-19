import { isValidUrl } from './validation';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80';

export const getValidImageUrl = (url: string | undefined | null): string => {
  if (!url || !isValidUrl(url)) {
    return DEFAULT_IMAGE;
  }
  return url;
};