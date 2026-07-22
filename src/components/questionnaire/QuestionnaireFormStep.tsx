import { IoSendOutline } from 'react-icons/io5';
import type { QuestionSection } from '../../lib/questionnaireData';

interface RatingOption {
  value: number;
  he: string;
  en: string;
}

interface Props {
  section: QuestionSection;
  isPerformanceSection: boolean;
  ratingOptions: RatingOption[];
  isHe: boolean;
  isLastSection: boolean;
  isFirstSection: boolean;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  notes: string;
  setNotes: (v: string) => void;
  submitting: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  PrevArrow: React.ComponentType<{ className?: string }>;
  NextArrow: React.ComponentType<{ className?: string }>;
}

export default function QuestionnaireFormStep({
  section, isPerformanceSection, ratingOptions, isHe, isLastSection, isFirstSection,
  answers, onAnswer, notes, setNotes, submitting, onPrev, onNext, onSubmit, PrevArrow, NextArrow,
}: Props) {
  const sIds = section.questions.map((q) => q.id);
  const sectionAnswered = sIds.filter((id) => answers[id] !== undefined).length;
  const sectionTotal = sIds.length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border shadow-sm bg-white">
        <div className="p-6 pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{isHe ? section.titleHe : section.titleEn}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {sectionAnswered}/{sectionTotal} {isHe ? 'שאלות נענו' : 'answered'}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-800 h-2 rounded-full transition-all"
              style={{ width: `${sectionTotal > 0 ? (sectionAnswered / sectionTotal) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="p-6 space-y-6">
          {isPerformanceSection && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              {isHe
                ? 'דרגו את הביצועים בכל תחום (1 = מצוין, 5 = בעייתי)'
                : 'Rate performance in each area (1 = Excellent, 5 = Problematic)'}
            </div>
          )}

          {section.questions.map((question, qIdx) => {
            const selected = answers[question.id];
            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border transition-colors ${
                  selected !== undefined ? 'bg-green-800/5 border-green-800/20' : 'bg-white border-gray-200'
                }`}
              >
                <p className="font-medium mb-3 text-sm sm:text-base text-gray-900">
                  <span className="text-gray-400 mr-2">{qIdx + 1}.</span>
                  {isHe ? question.he : question.en}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onAnswer(question.id, option.value)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all border min-w-[60px] ${
                        selected === option.value
                          ? 'bg-green-800 text-white border-green-800 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {isHe ? option.he : option.en}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isLastSection && (
        <div className="rounded-xl border shadow-sm bg-white">
          <div className="p-6 pb-2">
            <h3 className="text-lg font-bold text-gray-900">{isHe ? 'הערות נוספות' : 'Additional Notes'}</h3>
          </div>
          <div className="p-6 pt-0">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isHe ? 'הוסיפו הערות או מידע נוסף (אופציונלי)...' : 'Add any additional notes or information (optional)...'}
              className="w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2 pb-8">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PrevArrow className="w-4 h-4" />
          {isFirstSection ? (isHe ? 'חזרה לפרטים' : 'Back to Details') : (isHe ? 'הקודם' : 'Previous')}
        </button>

        {!isLastSection ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-lg bg-green-800 text-white px-4 py-2 text-sm font-medium hover:bg-green-900"
          >
            {isHe ? 'הבא' : 'Next'}
            <NextArrow className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-green-800 text-white px-4 py-2 text-sm font-medium hover:bg-green-900 disabled:opacity-60"
          >
            <IoSendOutline className="w-4 h-4" />
            {submitting ? (isHe ? 'שולח...' : 'Submitting...') : (isHe ? 'שלח/י שאלון' : 'Submit Questionnaire')}
          </button>
        )}
      </div>
    </div>
  );
}
