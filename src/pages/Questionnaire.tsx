/* eslint-disable max-lines */
import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  IoArrowBack, IoArrowForward, IoCheckmarkCircle, IoChevronBack, IoChevronForward,
  IoClose, IoEyeOutline, IoSendOutline,
} from 'react-icons/io5';
import { API_URL } from '../config/constants';
import {
  QUESTIONNAIRES, RATING_OPTIONS, PERFORMANCE_OPTIONS, calculateScores,
  type QuestionnaireType,
} from '../lib/questionnaireData';
import { EMPTY_RESPONDENT, type RespondentInfo } from '../components/questionnaire/questionnaireTypes';
import QuestionnaireRegisterStep from '../components/questionnaire/QuestionnaireRegisterStep';
import QuestionnaireSuccessStep from '../components/questionnaire/QuestionnaireSuccessStep';

type Step = 'register' | 'form' | 'review' | 'success';

function getQuestionnaireApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return import.meta.env.DEV ? `${API_URL}${normalizedPath}` : normalizedPath;
}

export default function Questionnaire() {
  const { type: rawType } = useParams<{ type: string }>();
  const type = (rawType || 'parent') as QuestionnaireType;
  const config = QUESTIONNAIRES[type];
  const { i18n } = useTranslation();
  const isHe = (i18n.language || 'he') !== 'en';

  const [step, setStep] = useState<Step>('register');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [respondent, setRespondent] = useState<RespondentInfo>(EMPTY_RESPONDENT);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dir = isHe ? 'rtl' : 'ltr';
  const BackArrow = isHe ? IoArrowForward : IoArrowBack;
  const NextArrow = isHe ? IoChevronBack : IoChevronForward;
  const PrevArrow = isHe ? IoChevronForward : IoChevronBack;

  const flatQuestions = useMemo(() => {
    if (!config) return [];
    return config.sections.flatMap((section, sectionIndex) => (
      section.questions.map((question) => {
        const isPerformance = section.id === 'performance';
        return {
          section,
          sectionIndex,
          question,
          isPerformance,
          ratingOptions: isPerformance ? PERFORMANCE_OPTIONS : RATING_OPTIONS,
        };
      })
    ));
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950/80 p-4" dir={dir}>
        <div className="max-w-md w-full text-center rounded-xl border bg-white p-8 shadow-2xl">
          <p className="text-lg mb-4">{isHe ? 'סוג שאלון לא תקין' : 'Invalid questionnaire type'}</p>
          <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-green-800 text-white px-4 py-2">
            {isHe ? 'חזרה לאתר' : 'Return Home'}
          </Link>
        </div>
      </div>
    );
  }

  const title = isHe ? config.titleHe : config.titleEn;
  const description = isHe ? config.descriptionHe : config.descriptionEn;
  const totalQuestions = flatQuestions.length;
  const currentQuestion = flatQuestions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.question.id] : undefined;
  const totalAnswered = flatQuestions.filter(({ question }) => answers[question.id] !== undefined).length;
  const unanswered = flatQuestions.filter(({ question }) => answers[question.id] === undefined);
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const validateRegistration = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!respondent.respondentName.trim()) {
      newErrors.respondentName = isHe ? 'שם מלא הוא שדה חובה' : 'Full name is required';
    }
    if (!respondent.respondentEmail.trim() || !/\S+@\S+\.\S+/.test(respondent.respondentEmail)) {
      newErrors.respondentEmail = isHe ? 'כתובת אימייל תקינה נדרשת' : 'Valid email is required';
    }
    if (!respondent.respondentPhone.trim() || respondent.respondentPhone.replace(/\D/g, '').length < 7) {
      newErrors.respondentPhone = isHe ? 'מספר טלפון תקין נדרש' : 'Valid phone number is required';
    }
    if (config.requiresChildInfo) {
      if (!respondent.childName.trim()) {
        newErrors.childName = isHe ? 'שם הילד/ה הוא שדה חובה' : "Child's name is required";
      }
      if (!respondent.childAge.trim() || isNaN(Number(respondent.childAge)) || Number(respondent.childAge) < 1) {
        newErrors.childAge = isHe ? 'גיל תקין נדרש' : 'Valid age is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistration()) {
      setStep('form');
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const goNext = () => {
    if (!currentQuestion || currentAnswer === undefined) {
      toast.error(isHe ? 'בחרו תשובה לפני שממשיכים.' : 'Choose an answer before continuing.');
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((p) => p + 1);
      return;
    }
    setStep('review');
  };

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
      return;
    }
    setStep('register');
  };

  const goReview = () => {
    setStep('review');
  };

  const editQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setStep('form');
  };

  const handleSubmit = async () => {
    if (unanswered.length > 0) {
      toast.error(
        isHe
          ? `יש ${unanswered.length} שאלות שלא נענו. בדקו את הרשימה לפני שליחה.`
          : `There are ${unanswered.length} unanswered questions. Review the list before submitting.`
      );
      return;
    }

    setSubmitting(true);
    try {
      const scores = calculateScores(type, answers);
      const payload = {
        type,
        respondentName: respondent.respondentName,
        respondentEmail: respondent.respondentEmail,
        respondentPhone: respondent.respondentPhone,
        childName: config.requiresChildInfo ? respondent.childName : null,
        childAge: config.requiresChildInfo && respondent.childAge ? parseInt(respondent.childAge, 10) : null,
        childGender: config.requiresChildInfo ? respondent.childGender || null : null,
        relationship: config.requiresChildInfo ? respondent.relationship || null : null,
        answers,
        scores,
        notes: notes || null,
      };

      const response = await fetch(getQuestionnaireApiUrl('/api/questionnaires/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('submit failed');

      setStep('success');
    } catch {
      toast.error(isHe ? 'שליחת השאלון נכשלה. אנא נסו שוב.' : 'Failed to submit questionnaire. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(22,101,52,0.18),_transparent_34%),linear-gradient(135deg,_#f8fafc,_#e5e7eb)] p-3 sm:p-6" dir={dir}>
      <div className="fixed inset-0 bg-gray-950/45 backdrop-blur-sm" />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-3rem)]">
        <section className="flex max-h-[94vh] w-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl">
          <header className="flex items-center gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 sm:px-6">
            <Link to="/#questionnaires" className="rounded-full p-2 text-green-800 hover:bg-gray-100" aria-label={isHe ? 'סגירה' : 'Close'}>
              <IoClose className="h-5 w-5" />
            </Link>
            <Link to="/" className="shrink-0">
              <img src="/assets/images/logoSVG.svg" alt={isHe ? 'קשב פלוס' : 'Keshev Plus'} className="h-9 w-auto" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">{title}</h1>
              {step !== 'register' && step !== 'success' && (
                <p className="text-xs text-gray-500">
                  {totalAnswered}/{totalQuestions} {isHe ? 'שאלות נענו' : 'questions answered'}
                </p>
              )}
            </div>
            {step === 'form' && (
              <button
                type="button"
                onClick={goReview}
                className="inline-flex items-center gap-1 rounded-lg border border-green-800/30 px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-50"
              >
                <IoEyeOutline className="h-4 w-4" />
                {isHe ? 'סקירה' : 'Review'}
              </button>
            )}
          </header>

          <div className="flex-1 overflow-y-auto bg-gray-50/70">
            <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-7">
              {step === 'register' && (
                <QuestionnaireRegisterStep
                  config={config}
                  title={title}
                  description={description}
                  isHe={isHe}
                  respondent={respondent}
                  setRespondent={setRespondent}
                  errors={errors}
                  onSubmit={handleRegisterSubmit}
                  NextArrow={NextArrow}
                />
              )}

              {step === 'form' && currentQuestion && (
                <div className="flex min-h-[min(680px,calc(94vh-8rem))] flex-col rounded-xl border bg-white shadow-sm">
                  <div className="border-b p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 text-sm text-gray-500">
                      <span>{isHe ? currentQuestion.section.titleHe : currentQuestion.section.titleEn}</span>
                      <span>{currentQuestionIndex + 1}/{totalQuestions}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-green-800 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-8">
                    {currentQuestion.isPerformance && (
                      <p className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                        {isHe
                          ? 'דרגו את הביצועים בכל תחום (1 = מצוין, 5 = בעייתי)'
                          : 'Rate performance in each area (1 = Excellent, 5 = Problematic)'}
                      </p>
                    )}

                    <p className="mb-6 text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl">
                      {isHe ? currentQuestion.question.he : currentQuestion.question.en}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {currentQuestion.ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleAnswer(currentQuestion.question.id, option.value)}
                          className={`min-h-[56px] rounded-xl border px-4 py-3 text-start text-base font-semibold transition-all ${
                            currentAnswer === option.value
                              ? 'border-green-800 bg-green-800 text-white shadow-sm'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-green-800/40 hover:bg-green-50'
                          }`}
                        >
                          {isHe ? option.he : option.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t bg-white p-4">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PrevArrow className="h-4 w-4" />
                      {currentQuestionIndex === 0 ? (isHe ? 'חזרה לפרטים' : 'Back to Details') : (isHe ? 'הקודם' : 'Previous')}
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-lg bg-green-800 px-4 text-sm font-medium text-white hover:bg-green-900"
                    >
                      {currentQuestionIndex === totalQuestions - 1 ? (isHe ? 'לסקירה' : 'Review') : (isHe ? 'הבא' : 'Next')}
                      <NextArrow className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-4 rounded-xl border bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{isHe ? 'סקירת תשובות' : 'Review Answers'}</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {isHe ? 'בדקו את התשובות לפני שליחת השאלון.' : 'Check your answers before submitting the questionnaire.'}
                      </p>
                    </div>
                    {unanswered.length > 0 && (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                        {unanswered.length} {isHe ? 'חסרות' : 'missing'}
                      </span>
                    )}
                  </div>

                  <div className="max-h-[46vh] space-y-3 overflow-y-auto pr-1">
                    {flatQuestions.map((item, index) => {
                      const answer = answers[item.question.id];
                      const answerLabel = item.ratingOptions.find((option) => option.value === answer);
                      return (
                        <button
                          key={item.question.id}
                          type="button"
                          onClick={() => editQuestion(index)}
                          className={`w-full rounded-lg border p-3 text-start transition-colors ${
                            answer === undefined ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="mb-1 flex items-center justify-between gap-3 text-xs text-gray-500">
                            <span>{index + 1}. {isHe ? item.section.titleHe : item.section.titleEn}</span>
                            {answer !== undefined && <IoCheckmarkCircle className="h-4 w-4 text-green-800" />}
                          </div>
                          <p className="text-sm font-medium text-gray-900">{isHe ? item.question.he : item.question.en}</p>
                          <p className={`mt-1 text-sm ${answer === undefined ? 'text-red-700' : 'text-green-800'}`}>
                            {answerLabel ? (isHe ? answerLabel.he : answerLabel.en) : (isHe ? 'לא נענתה' : 'Not answered')}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label htmlFor="questionnaire-notes" className="mb-1 block text-sm font-semibold text-gray-800">
                      {isHe ? 'הערות נוספות' : 'Additional Notes'}
                    </label>
                    <textarea
                      id="questionnaire-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isHe ? 'הוסיפו הערות או מידע נוסף (אופציונלי)...' : 'Add any additional notes or information (optional)...'}
                      className="min-h-[96px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <BackArrow className="h-4 w-4" />
                      {isHe ? 'חזרה לשאלות' : 'Back to Questions'}
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting || unanswered.length > 0}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-green-800 px-4 text-sm font-medium text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      <IoSendOutline className="h-4 w-4" />
                      {submitting ? (isHe ? 'שולח...' : 'Submitting...') : (isHe ? 'שליחת שאלון' : 'Submit Questionnaire')}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <QuestionnaireSuccessStep
                  isHe={isHe}
                  respondentName={respondent.respondentName}
                  respondentEmail={respondent.respondentEmail}
                  BackArrow={BackArrow}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
