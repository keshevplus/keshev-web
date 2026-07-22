import { useQuery } from '@tanstack/react-query';
import { fetchWidgetSettings, DEFAULT_WIDGET_SETTINGS } from '../services/cms';

export function useWidgetSettings() {
  const { data } = useQuery({
    queryKey: ['cms-widget-settings'],
    queryFn: fetchWidgetSettings,
  });

  return data ?? DEFAULT_WIDGET_SETTINGS;
}
