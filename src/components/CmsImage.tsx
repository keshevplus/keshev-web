import { useState } from 'react';
import { imageSlotUrl } from '../services/cms';

interface CmsImageProps {
  slot: string;
  fallback: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

// Admin-managed image by slot name, falling back to a bundled static asset
// if the slot isn't filled in (or the fetch fails).
export default function CmsImage({ slot, fallback, alt, className, loading = 'lazy' }: CmsImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? fallback : imageSlotUrl(slot)}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
