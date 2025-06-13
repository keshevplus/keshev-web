/**
 * Helper functions for handling page sections and content
 */

/**
 * Maps an array of sections to an object keyed by section IDs
 * for easier direct access by ID
 * 
 * @param sections Array of section objects with 'id' property
 * @returns Object with sections accessible by their IDs
 */
export function mapSectionsById<T extends { id: string }>(sections: T[]): Record<string, T> {
  return sections.reduce((map, section) => {
    if (section.id) {
      map[section.id] = section;
    }
    return map;
  }, {} as Record<string, T>);
}

/**
 * Safely gets a section by ID from a sections map
 * Returns undefined if the section doesn't exist
 * 
 * @param sectionsMap Map of sections keyed by ID
 * @param id The ID of the section to retrieve
 * @returns The section or undefined if not found
 */
export function getSectionById<T>(
  sectionsMap: Record<string, T> | undefined, 
  id: string
): T | undefined {
  return sectionsMap ? sectionsMap[id] : undefined;
}

/**
 * Gets multiple sections by their IDs
 * 
 * @param sectionsMap Map of sections keyed by ID
 * @param ids Array of section IDs to retrieve
 * @returns Object with requested sections keyed by their IDs
 */
export function getSectionsByIds<T>(
  sectionsMap: Record<string, T> | undefined,
  ids: string[]
): Record<string, T> {
  if (!sectionsMap) return {} as Record<string, T>;
  
  return ids.reduce((result, id) => {
    if (sectionsMap[id]) {
      result[id] = sectionsMap[id];
    }
    return result;
  }, {} as Record<string, T>);
}