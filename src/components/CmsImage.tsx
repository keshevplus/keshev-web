import { type CSSProperties, useState } from 'react';
import { imageSlotUrl } from '../services/cms';

interface CmsImageProps {
  slot: string;
  fallback: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

// Admin-managed image by slot name, falling back to a bundled static asset
// if the slot isn't filled in (or the fetch fails).
export default function CmsImage({ slot, fallback, alt, className, style, loading = 'lazy', fetchPriority }: CmsImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? fallback : imageSlotUrl(slot)}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
