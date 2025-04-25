import React from 'react';

// Basic styling - consider moving to CSS file
const iconContainerStyle: React.CSSProperties = {
  display: 'inline-block', // Or block, depending on layout
  // Add styling for size, color, etc. as needed
  fontSize: '1.5rem',
  margin: '0 0.5rem',
  verticalAlign: 'middle', // Align with flags if placed inline
};

const AccessibilityIcon: React.FC = () => {
  // TODO: Replace this with an actual SVG or <img> tag for the Israeli accessibility icon
  return (
    <span 
      style={iconContainerStyle} 
      title="נגיש (Accessible)" // Tooltip
      aria-label="Accessibility features enabled" // Screen reader description
    >
      ♿נגיש
    </span>
  );
};

export default AccessibilityIcon;
