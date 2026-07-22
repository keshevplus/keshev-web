import { useQuery } from '@tanstack/react-query';
import { fetchHomeSections, DEFAULT_HOME_SECTIONS } from '../services/cms';

export function useHomeSections() {
  const { data } = useQuery({
    queryKey: ['cms-home-sections'],
    queryFn: fetchHomeSections,
  });

  return data?.filter((section) => section.enabled) ?? DEFAULT_HOME_SECTIONS;
}
