/**
 * Admin Isolation Utilities
 * 
 * This module provides utilities to isolate admin functionality from the main site.
 * It includes feature flags, error handling, and tools to prevent admin issues from
 * affecting the public-facing portions of the site.
 */

// Define admin feature flags
export interface AdminFeatureFlags {
  readonly dashboard: boolean;
  readonly leads: boolean;
  readonly users: boolean;
  readonly content: boolean;
}

// Default configuration
const defaultFlags: AdminFeatureFlags = {
  dashboard: true,
  leads: true,
  users: true,
  content: true,
};

// Environment-based configuration
const envFlags: Partial<AdminFeatureFlags> = {
  dashboard: import.meta.env.VITE_ADMIN_DASHBOARD !== 'false',
  leads: import.meta.env.VITE_ADMIN_LEADS !== 'false',
  users: import.meta.env.VITE_ADMIN_USERS !== 'false',
  content: import.meta.env.VITE_ADMIN_CONTENT !== 'false',
};

// Runtime flags (can be modified during runtime for emergency disabling)
let runtimeFlags: Record<string, boolean> = {};

/**
 * Service for managing admin feature flags and isolation
 */
export const adminIsolationService = {
  /**
   * Check if an admin feature is enabled
   */
  isFeatureEnabled: (feature: keyof AdminFeatureFlags): boolean => {
    // Priority: runtime flags > environment flags > defaults
    if (feature in runtimeFlags) {
      return runtimeFlags[feature];
    }
    
    if (feature in envFlags && envFlags[feature] !== undefined) {
      return envFlags[feature] as boolean;
    }
    
    return defaultFlags[feature];
  },
  
  /**
   * Disable an admin feature at runtime (for emergency situations)
   */
  disableFeature: (feature: keyof AdminFeatureFlags): void => {
    runtimeFlags[feature as string] = false;
    console.warn(`Admin feature '${feature}' has been disabled at runtime`);
  },
  
  /**
   * Re-enable an admin feature
   */
  enableFeature: (feature: keyof AdminFeatureFlags): void => {
    runtimeFlags[feature as string] = true;
    console.info(`Admin feature '${feature}' has been re-enabled`);
  },
  
  /**
   * Get all admin feature flags
   */
  getAllFeatures: (): AdminFeatureFlags => {
    return {
      dashboard: adminIsolationService.isFeatureEnabled('dashboard'),
      leads: adminIsolationService.isFeatureEnabled('leads'),
      users: adminIsolationService.isFeatureEnabled('users'),
      content: adminIsolationService.isFeatureEnabled('content')
    };
  },
  
  /**
   * Log admin errors without affecting the main site
   */
  logError: (error: Error, componentName: string): void => {
    console.error(`Admin Error in ${componentName}:`, error);
    // Could be extended to send errors to monitoring service
  },
};
