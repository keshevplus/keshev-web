/**
 * SafeAdminComponentWrapper
 * 
 * This component provides an additional layer of protection around admin components.
 * It uses React's error boundaries and suspense to ensure that errors in admin components
 * never affect the public-facing parts of the website.
 */

import React, { Suspense, useState, useEffect, ComponentType } from 'react';
import { adminIsolationService } from '../../utils/adminIsolation';

interface SafeAdminComponentWrapperProps {
  component: ComponentType<any>;
  featureFlag: 'dashboard' | 'leads' | 'users' | 'content';
  fallback?: React.ReactNode;
  componentProps?: Record<string, any>;
}

/**
 * A wrapper that safely renders admin components with multiple layers of protection
 */
const SafeAdminComponentWrapper: React.FC<SafeAdminComponentWrapperProps> = ({
  component: Component,
  featureFlag,
  fallback = <div className="p-4 text-gray-500">Loading admin component...</div>,
  componentProps = {}
}) => {
  const [hasError, setHasError] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  
  // Check if this feature is enabled via the feature flag system
  useEffect(() => {
    const checkFeatureStatus = (): void => {
      const enabled = adminIsolationService.isFeatureEnabled(featureFlag);
      setIsEnabled(enabled);
    };
    
    // Check initially
    checkFeatureStatus();
    
    // Set up interval to check periodically (for runtime disabling)
    const interval = setInterval(checkFeatureStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [featureFlag]);
  
  // If an error occurs in the component, log it and disable the component
  const handleError = (error: Error): void => {
    console.error(`Error in admin component (${featureFlag}):`, error);
    setHasError(true);
    // Commented out so admin pages won’t stay disabled:
    // adminIsolationService.disableFeature(featureFlag);
  };
  
  // If this feature is disabled, show disabled message
  if (!isEnabled) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-inner text-center">
        <p className="text-gray-500">This admin feature is currently disabled.</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => {
            adminIsolationService.enableFeature(featureFlag);
            setIsEnabled(true);
            setHasError(false);
          }}
        >
          Re-enable Feature
        </button>
      </div>
    );
  }
  
  // If there was an error, show error message
  if (hasError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-inner">
        <h3 className="text-red-600 font-bold mb-2">Admin Component Error</h3>
        <p className="text-gray-700 mb-4">
          This component encountered an error and has been temporarily disabled to prevent affecting other parts of the site.
        </p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => {
            setHasError(false);
            adminIsolationService.enableFeature(featureFlag);
          }}
        >
          Retry Component
        </button>
      </div>
    );
  }
  
  // Otherwise, render the component safely with error handling
  return (
    <Suspense fallback={fallback}>
      <ErrorCatcher onError={handleError}>
        <Component {...componentProps} />
      </ErrorCatcher>
    </Suspense>
  );
};

/**
 * Simple error boundary component for catching errors in admin components
 */
class ErrorCatcher extends React.Component<{ 
  children: React.ReactNode; 
  onError: (error: Error) => void;
}> {
  state = { hasError: false };
  
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error): void {
    this.props.onError(error);
  }
  
  render(): React.ReactNode {
    if (this.state.hasError) {
      return null; // Parent component will handle the error display
    }
    
    return this.props.children;
  }
}

export default SafeAdminComponentWrapper;
