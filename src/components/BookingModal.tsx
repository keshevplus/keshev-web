/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose, IoCalendarOutline, IoTimeOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import {
  APPOINTMENT_TIME_SLOTS,
  APPOINTMENT_TYPES,
  fetchAppointmentAvailability,
  getAppointmentApiUrl,
  getAppointmentSubmitError,
  getLocalDateInputValue,
  type AppointmentAvailability,
} from '../lib/appointmentApi';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

type AppointmentFor = 'self' | 'child';

const MIN_CHILD_AGE = 6;

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const { t } = useCmsTranslations();
  const { i18n } = useTranslation();
  const language = i18n.language || 'he';
  const isHe = language === 'he';
  const isRTL = ['he', 'ar', 'yi'].includes(language);
  const inputAlign = isRTL ? 'text-right' : 'text-left';
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availability, setAvailability] = useState<AppointmentAvailability | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [form, setForm] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhone: '',
    appointmentFor: 'self' as AppointmentFor,
    childName: '',
    childFirstName: '',
    childLastName: '',
    childAge: '' as number | '',
    date: '',
    time: '',
    type: 'consultation',
    notes: '',
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const loadAvailability = async (date?: string, type?: string) => {
    setAvailabilityLoading(true);
    try {
      const next = await fetchAppointmentAvailability(date, type || form.type);
      setAvailability(next);
      return next;
    } finally {
      setAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const current = availability || await loadAvailability();
        if (!form.date && current.nextAvailableDate) {
          const next = await loadAvailability(current.nextAvailableDate);
          setForm((f) => ({ ...f, date: current.nextAvailableDate || '', time: next.availableTimes.includes(f.time) ? f.time : '' }));
        }
      } catch {
        // The server still validates availability on submit.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDateChange = async (date: string) => {
    setForm((f) => ({ ...f, date, time: '' }));
    try {
      const next = await loadAvailability(date);
      if (next.availableTimes.length === 0 && next.nextAvailableDate && next.nextAvailableDate !== date) {
        const nearest = await loadAvailability(next.nextAvailableDate);
        setForm((f) => ({ ...f, date: next.nextAvailableDate || f.date, time: nearest.availableTimes.includes(f.time) ? f.time : '' }));
        toast.info(t('booking.date_unavailable_description', 'בחרנו עבורך את התאריך הפנוי הקרוב ביותר.'));
      }
    } catch {
      toast.error(t('booking.availability_check_failed', 'לא הצלחנו לבדוק זמינות. נסו שוב.'));
    }
  };

  const handleTypeChange = async (type: string) => {
    setForm((f) => ({ ...f, type }));
    if (!form.date) return;
    try {
      const next = await loadAvailability(form.date, type);
      if (form.time && !next.availableTimes.includes(form.time)) {
        setForm((f) => ({ ...f, time: '' }));
        toast.info(t('booking.time_unavailable_description', 'בחרו שעה אחרת מהרשימה המעודכנת.'));
      }
    } catch {
      // The server still validates availability on submit.
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      clientFirstName: '', clientLastName: '', clientEmail: '', clientPhone: '', appointmentFor: 'self',
      childName: '', childFirstName: '', childLastName: '', childAge: '', date: '', time: '', type: 'consultation', notes: '',
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = [
      !form.clientFirstName.trim() && t('booking.first_name', 'שם פרטי'),
      !form.clientLastName.trim() && t('booking.last_name', 'שם משפחה'),
      !form.clientEmail.trim() && t('booking.email', 'דוא"ל'),
      !form.clientPhone.trim() && t('booking.phone', 'טלפון'),
      !form.date && t('booking.date', 'תאריך'),
      !form.time && t('booking.time', 'שעה'),
      form.appointmentFor === 'child' && !form.childFirstName.trim() && t('appt_for.child_first_name', 'שם פרטי של הילד/ה'),
      form.appointmentFor === 'child' && !form.childLastName.trim() && t('appt_for.child_last_name', 'שם משפחה של הילד/ה'),
      form.appointmentFor === 'child' && form.childAge === '' && t('appt_for.child_age', 'גיל הילד/ה'),
    ].filter(Boolean);

    if (validationErrors.length > 0) {
      const message = `${t('booking.fill_required_fields', 'אנא מלאו את כל השדות הנדרשים')}: ${validationErrors.join(', ')}`;
      toast.error(message);
      return;
    }

    if (form.appointmentFor === 'child' && Number(form.childAge) < MIN_CHILD_AGE) {
      const message = t('appt_for.min_age_error', 'הגיל המינימלי הוא 6');
      toast.error(message);
      return;
    }

    setSubmitting(true);
    try {
      const clientName = `${form.clientFirstName.trim()} ${form.clientLastName.trim()}`.trim();
      const childName = `${form.childFirstName.trim()} ${form.childLastName.trim()}`.trim();
      const appointmentFields = {
        clientEmail: form.clientEmail,
        clientPhone: form.clientPhone,
        appointmentFor: form.appointmentFor,
        date: form.date,
        time: form.time,
        type: form.type,
        notes: form.notes,
      };
      const response = await fetch(getAppointmentApiUrl('/api/appointments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentFields,
          clientName,
          childName: form.appointmentFor === 'child' ? childName : null,
          childAge: form.appointmentFor === 'child' ? form.childAge : null,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setSubmitted(true);
      toast.success(t('booking.booked_toast_title', 'הפגישה נקבעה!'));
    } catch (err) {
      const message = getAppointmentSubmitError(err, isHe) || t('booking.submit_failed', 'קביעת הפגישה נכשלה. נסו שוב.');
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const today = getLocalDateInputValue();
  const availableTimes = availability?.date === form.date ? availability.availableTimes : APPOINTMENT_TIME_SLOTS;
  const showMinAgeError = form.childAge !== '' && form.childAge < MIN_CHILD_AGE;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border-2 border-green-800 bg-white shadow-2xl" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-200 bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <IoCalendarOutline className="h-5 w-5 text-green-800" />
            {t('booking.title', 'קביעת פגישה')}
          </h2>
          <button type="button" onClick={handleClose} className="p-1 rounded hover:bg-gray-100" aria-label={t('a11y.close', 'סגור')}>
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center space-y-4">
            <IoCheckmarkCircle className="h-16 w-16 text-green-800 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900">{t('booking.success_title', 'הפגישה נקבעה בהצלחה!')}</h3>
            <p className="text-gray-600">{t('booking.success_description', 'נחזור אליכם בהקדם לאשר את הפגישה. תודה!')}</p>
            <button type="button" onClick={handleClose} className="min-h-[44px] px-6 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold">
              {t('booking.close', 'סגירה')}
            </button>
          </div>
        ) : (
          <div className="px-6 py-5">
            <p className="text-sm text-gray-500 mb-4">{t('booking.modal_intro', 'מלאו את הפרטים ונחזור אליכם לאישור הפגישה. שדות עם * הם חובה.')}</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">{t('booking.first_name', 'שם פרטי')} *</label>
                  <input
                    value={form.clientFirstName}
                    onChange={(e) => setForm((f) => ({ ...f, clientFirstName: e.target.value }))}
                    placeholder={t('booking.first_name_placeholder', 'הכניסו שם פרטי')}
                    required
                    className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">{t('booking.last_name', 'שם משפחה')} *</label>
                  <input
                    value={form.clientLastName}
                    onChange={(e) => setForm((f) => ({ ...f, clientLastName: e.target.value }))}
                    placeholder={t('booking.last_name_placeholder', 'הכניסו שם משפחה')}
                    required
                    className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">{t('booking.phone', 'טלפון')} *</label>
                  <input
                    type="tel"
                    value={form.clientPhone}
                    onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))}
                    placeholder={t('booking.phone_placeholder', 'מספר הטלפון שלכם')}
                    required
                    className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">{t('booking.email', 'דוא"ל')} *</label>
                <input
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm((f) => ({ ...f, clientEmail: e.target.value }))}
                  placeholder={t('booking.email_placeholder', 'כתובת הדוא"ל שלכם')}
                  required
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">{t('appt_for.who', 'עבור מי הפגישה?')}</label>
                <div className="grid grid-cols-2 rounded-lg border border-gray-300 bg-gray-50 p-1 gap-1">
                  {(['self', 'child'] as AppointmentFor[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((f) => ({
                        ...f,
                        appointmentFor: value,
                        childName: value === 'self' ? '' : f.childName,
                        childFirstName: value === 'self' ? '' : f.childFirstName,
                        childLastName: value === 'self' ? '' : f.childLastName,
                        childAge: value === 'self' ? '' : f.childAge,
                      }))}
                      className={`h-10 rounded-md text-sm font-medium transition-colors ${form.appointmentFor === value ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600'}`}
                    >
                      {value === 'self' ? t('appt_for.me', 'עבורי') : t('appt_for.child', 'עבור הילד/ה')}
                    </button>
                  ))}
                </div>
              </div>

              {form.appointmentFor === 'child' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-800">{t('appt_for.child_first_name', 'שם פרטי של הילד/ה')} *</label>
                    <input
                      value={form.childFirstName}
                      onChange={(e) => setForm((f) => ({ ...f, childFirstName: e.target.value }))}
                      required
                      className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-800">{t('appt_for.child_last_name', 'שם משפחה של הילד/ה')} *</label>
                    <input
                      value={form.childLastName}
                      onChange={(e) => setForm((f) => ({ ...f, childLastName: e.target.value }))}
                      required
                      className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                    />
                  </div>
                </div>
              )}

              {form.appointmentFor === 'child' && (
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-800">{t('appt_for.child_age', 'גיל הילד/ה')} *</label>
                    <input
                      type="number"
                      min={MIN_CHILD_AGE}
                      value={form.childAge === '' ? '' : String(form.childAge)}
                      onChange={(e) => setForm((f) => ({ ...f, childAge: e.target.value === '' ? '' : Number(e.target.value) }))}
                      placeholder={t('appt_for.child_age_placeholder', '(מינימום 6)')}
                      required
                      className={`w-full p-3 rounded-lg border ${inputAlign} ${showMinAgeError ? 'border-red-700' : 'border-gray-300 focus:border-green-500'}`}
                    />
                    {showMinAgeError && (
                      <p className="text-xs text-red-700">{t('appt_for.min_age_error', 'הגיל המינימלי הוא 6')}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">{t('booking.appointment_type', 'סוג הפגישה')} *</label>
                <select
                  value={form.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                >
                  {APPOINTMENT_TYPES.map((apptType) => (
                    <option key={apptType.value} value={apptType.value}>
                      {t(apptType.translationKey, isHe ? apptType.he : apptType.en)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800 flex items-center gap-1 justify-end">
                    <IoCalendarOutline className="h-4 w-4" /> {t('booking.date', 'תאריך')} *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                    className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800 flex items-center gap-1 justify-end">
                    <IoTimeOutline className="h-4 w-4" /> {t('booking.time', 'שעה')} *
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    disabled={!form.date || availabilityLoading || availableTimes.length === 0}
                    required
                    className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 disabled:bg-gray-100 ${inputAlign}`}
                  >
                    <option value="">{availabilityLoading ? t('booking.checking_availability', 'בודק זמינות...') : t('booking.select_time', 'בחרו שעה')}</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {form.date && !availabilityLoading && availableTimes.length === 0 && (
                    <p className="text-xs text-red-700">{t('booking.no_times_available', 'אין שעות פנויות בתאריך זה.')}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">{t('booking.notes', 'הערות (אופציונלי)')}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder={t('booking.notes_placeholder', 'מידע נוסף שתרצו לשתף...')}
                  rows={3}
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 ${inputAlign}`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[48px] rounded-lg bg-green-800 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold"
              >
                {submitting ? t('booking.submitting', 'שולח...') : t('booking.submit', 'קביעת פגישה')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
