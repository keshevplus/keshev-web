import { API_URL } from '../config/constants';

// Mirrors shared/appointmentSchedule.ts on the keshevplus platform. Duplicated
// here (rather than imported) since keshev-web has no access to that shared
// package; this is static, rarely-changing schedule config, not business
// logic that's likely to drift.
export const APPOINTMENT_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
] as const;

export const APPOINTMENT_TYPES = [
  { value: 'consultation', he: 'ייעוץ ראשוני', en: 'Initial Consultation' },
  { value: 'diagnosis', he: 'אבחון', en: 'Diagnosis' },
  { value: 'followup', he: 'מעקב', en: 'Follow-up' },
  { value: 'treatment', he: 'טיפול', en: 'Treatment' },
  { value: 'moxo', he: 'בדיקת MOXO', en: 'MOXO Test' },
] as const;

export function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface AppointmentAvailability {
  date: string;
  availableTimes: string[];
  bookedTimes: string[];
  nextAvailableDate: string | null;
  timeSlots: string[];
}

// Hits the same backend keshevplus.com uses, so bookings land in the same
// admin dashboard/database regardless of which site the visitor came from.
export async function fetchAppointmentAvailability(date?: string, type?: string): Promise<AppointmentAvailability> {
  const params = new URLSearchParams();
  if (date) params.set('date', date);
  if (type) params.set('type', type);
  const query = params.toString();
  const response = await fetch(`${API_URL}/api/appointments/availability${query ? `?${query}` : ''}`);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export function getAppointmentSubmitError(error: unknown, isHe: boolean) {
  const raw = error instanceof Error ? error.message : String(error || '');
  const jsonStart = raw.indexOf('{');
  if (jsonStart >= 0) {
    try {
      const parsed = JSON.parse(raw.slice(jsonStart));
      if (isHe && parsed.errorHe) return parsed.errorHe;
      if (!isHe && parsed.errorEn) return parsed.errorEn;
      if (parsed.error) return parsed.error;
    } catch {
      // Fall through to the raw message.
    }
  }
  return raw;
}
