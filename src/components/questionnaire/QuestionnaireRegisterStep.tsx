import { IoClipboardOutline } from 'react-icons/io5';
import type { QuestionnaireConfig } from '../../lib/questionnaireData';
import type { RespondentInfo } from './questionnaireTypes';

interface Props {
  config: QuestionnaireConfig;
  title: string;
  description: string;
  isHe: boolean;
  respondent: RespondentInfo;
  setRespondent: React.Dispatch<React.SetStateAction<RespondentInfo>>;
  errors: Record<string, string>;
  onSubmit: (e: React.FormEvent) => void;
  NextArrow: React.ComponentType<{ className?: string }>;
}

export default function QuestionnaireRegisterStep({
  config, title, description, isHe, respondent, setRespondent, errors, onSubmit, NextArrow,
}: Props) {
  return (
    <div className="rounded-xl border shadow-sm bg-white">
      <div className="text-center px-6 pt-8 pb-2">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-800/10 rounded-full flex items-center justify-center">
          <IoClipboardOutline className="w-8 h-8 text-green-800" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <div className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-1 text-sm text-gray-900">
              {isHe ? 'פרטים אישיים' : 'Personal Information'}
            </h3>
            <p className="text-xs text-gray-500">
              {isHe ? 'אנא מלאו את הפרטים שלכם לפני מילוי השאלון' : 'Please fill in your details before completing the questionnaire'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="respondentFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {isHe ? 'שם פרטי *' : 'First Name *'}
                </label>
                <input
                  id="respondentFirstName"
                  value={respondent.respondentFirstName}
                  onChange={(e) => setRespondent((p) => ({ ...p, respondentFirstName: e.target.value }))}
                  placeholder={isHe ? 'שם פרטי' : 'First name'}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                />
                {errors.respondentFirstName && <p className="text-red-600 text-xs mt-1">{errors.respondentFirstName}</p>}
              </div>

              <div>
                <label htmlFor="respondentLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {isHe ? 'שם משפחה *' : 'Last Name *'}
                </label>
                <input
                  id="respondentLastName"
                  value={respondent.respondentLastName}
                  onChange={(e) => setRespondent((p) => ({ ...p, respondentLastName: e.target.value }))}
                  placeholder={isHe ? 'שם משפחה' : 'Last name'}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                />
                {errors.respondentLastName && <p className="text-red-600 text-xs mt-1">{errors.respondentLastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="respondentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                {isHe ? 'דוא"ל *' : 'Email *'}
              </label>
              <input
                id="respondentEmail"
                type="email"
                value={respondent.respondentEmail}
                onChange={(e) => setRespondent((p) => ({ ...p, respondentEmail: e.target.value }))}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
              />
              {errors.respondentEmail && <p className="text-red-600 text-xs mt-1">{errors.respondentEmail}</p>}
            </div>

            <div>
              <label htmlFor="respondentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                {isHe ? 'טלפון *' : 'Phone *'}
              </label>
              <input
                id="respondentPhone"
                type="tel"
                value={respondent.respondentPhone}
                onChange={(e) => setRespondent((p) => ({ ...p, respondentPhone: e.target.value }))}
                placeholder="050-1234567"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
              />
              {errors.respondentPhone && <p className="text-red-600 text-xs mt-1">{errors.respondentPhone}</p>}
            </div>
          </div>

          {config.requiresChildInfo && (
            <>
              <div className="bg-gray-50 rounded-lg p-4 mt-6 mb-2">
                <h3 className="font-semibold mb-1 text-sm text-gray-900">
                  {isHe ? 'פרטי הילד/ה' : "Child's Information"}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      {isHe ? 'שם פרטי של הילד/ה *' : "Child's First Name *"}
                    </label>
                    <input
                      id="childFirstName"
                      value={respondent.childFirstName}
                      onChange={(e) => setRespondent((p) => ({ ...p, childFirstName: e.target.value }))}
                      placeholder={isHe ? 'שם פרטי' : 'First name'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                    />
                    {errors.childFirstName && <p className="text-red-600 text-xs mt-1">{errors.childFirstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      {isHe ? 'שם משפחה של הילד/ה *' : "Child's Last Name *"}
                    </label>
                    <input
                      id="childLastName"
                      value={respondent.childLastName}
                      onChange={(e) => setRespondent((p) => ({ ...p, childLastName: e.target.value }))}
                      placeholder={isHe ? 'שם משפחה' : 'Last name'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                    />
                    {errors.childLastName && <p className="text-red-600 text-xs mt-1">{errors.childLastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                      {isHe ? 'גיל *' : 'Age *'}
                    </label>
                    <input
                      id="childAge"
                      type="number"
                      min="1"
                      max="120"
                      value={respondent.childAge}
                      onChange={(e) => setRespondent((p) => ({ ...p, childAge: e.target.value }))}
                      placeholder={isHe ? 'גיל' : 'Age'}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                    />
                    {errors.childAge && <p className="text-red-600 text-xs mt-1">{errors.childAge}</p>}
                  </div>

                  <div>
                    <label htmlFor="childGender" className="block text-sm font-medium text-gray-700 mb-1">
                      {isHe ? 'מין' : 'Gender'}
                    </label>
                    <select
                      id="childGender"
                      value={respondent.childGender}
                      onChange={(e) => setRespondent((p) => ({ ...p, childGender: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                    >
                      <option value="">{isHe ? 'בחר/י' : 'Select'}</option>
                      <option value="male">{isHe ? 'זכר' : 'Male'}</option>
                      <option value="female">{isHe ? 'נקבה' : 'Female'}</option>
                      <option value="other">{isHe ? 'אחר' : 'Other'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                    {isHe ? 'קרבה לילד/ה' : 'Relationship to Child'}
                  </label>
                  <select
                    id="relationship"
                    value={respondent.relationship}
                    onChange={(e) => setRespondent((p) => ({ ...p, relationship: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                  >
                    <option value="">{isHe ? 'בחר/י' : 'Select'}</option>
                    <option value="parent">{isHe ? 'הורה' : 'Parent'}</option>
                    <option value="guardian">{isHe ? 'אפוטרופוס' : 'Guardian'}</option>
                    <option value="teacher">{isHe ? 'מורה' : 'Teacher'}</option>
                    <option value="other">{isHe ? 'אחר' : 'Other'}</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-green-800 text-white px-4 py-2.5 font-medium hover:bg-green-900 transition-colors"
          >
            {isHe ? 'התחל/י את השאלון' : 'Start Questionnaire'}
            <NextArrow className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
