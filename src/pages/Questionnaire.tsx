import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  IoArrowBack, IoArrowForward, IoCheckmarkCircle, IoChevronBack, IoChevronForward,
} from 'react-icons/io5';
import { API_URL } from '../config/constants';
import {
  QUESTIONNAIRES, RATING_OPTIONS, PERFORMANCE_OPTIONS, calculateScores,
  type QuestionnaireType,
} from '../lib/questionnaireData';
import { EMPTY_RESPONDENT, type RespondentInfo } from '../components/questionnaire/questionnaireTypes';
import QuestionnaireRegisterStep from '../components/questionnaire/QuestionnaireRegisterStep';
import QuestionnaireFormStep from '../components/questionnaire/QuestionnaireFormStep';
import QuestionnaireSuccessStep from '../components/questionnaire/QuestionnaireSuccessStep';

type Step = 'register' | 'form' | 'success';

export default function Questionnaire() {
  const { type: rawType } = useParams<{ type: string }>();
  const type = (rawType || 'parent') as QuestionnaireType;
  const config = QUESTIONNAIRES[type];
  const { i18n } = useTranslation();
  const isHe = (i18n.language || 'he') !== 'en';

  const [step, setStep] = useState<Step>('register');
  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [respondent, setRespondent] = useState<RespondentInfo>(EMPTY_RESPONDENT);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" dir={isHe ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full mx-4 text-center rounded-xl border p-8">
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
  const dir = isHe ? 'rtl' : 'ltr';
  const BackArrow = isHe ? IoArrowForward : IoArrowBack;
  const NextArrow = isHe ? IoChevronBack : IoChevronForward;
  const PrevArrow = isHe ? IoChevronForward : IoChevronBack;

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
      window.scrollTo(0, 0);
    }
  };

  const currentSectionData = config.sections[currentSection];
  const isPerformanceSection = currentSectionData?.id === 'performance';
  const ratingOptions = isPerformanceSection ? PERFORMANCE_OPTIONS : RATING_OPTIONS;

  const allQuestionIds = config.sections.flatMap((s) => s.questions.map((q) => q.id));
  const totalAnswered = allQuestionIds.filter((id) => answers[id] !== undefined).length;
  const totalQuestions = allQuestionIds.length;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const unanswered = allQuestionIds.filter((id) => answers[id] === undefined);
    if (unanswered.length > 0) {
      toast.error(
        isHe
          ? `יש ${unanswered.length} שאלות שלא נענו. אנא ענה/י על כל השאלות.`
          : `There are ${unanswered.length} unanswered questions. Please answer all questions.`
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

      const response = await fetch(`${API_URL}/api/questionnaires/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('submit failed');

      setStep('success');
      window.scrollTo(0, 0);
    } catch {
      toast.error(isHe ? 'שליחת השאלון נכשלה. אנא נסו שוב.' : 'Failed to submit questionnaire. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50" dir={dir}>
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/#questionnaires" className="p-2 -m-2 rounded-full hover:bg-gray-100 text-green-800 shrink-0" aria-label={isHe ? 'חזרה' : 'Back'}>
            <BackArrow className="w-5 h-5" />
          </Link>
          <Link to="/" className="shrink-0">
            <img src="/assets/images/logoSVG.svg" alt={isHe ? 'קשב פלוס' : 'Keshev Plus'} className="h-9 w-auto" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate text-gray-900">{title}</h1>
            {step === 'form' && (
              <p className="text-xs text-gray-500">
                {totalAnswered}/{totalQuestions} {isHe ? 'שאלות נענו' : 'questions answered'}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {step === 'form' && (
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {config.sections.map((section, idx) => {
              const sIds = section.questions.map((q) => q.id);
              const answered = sIds.filter((id) => answers[id] !== undefined).length;
              const complete = answered === sIds.length;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setCurrentSection(idx)}
                  className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                    idx === currentSection
                      ? 'bg-green-800 text-white border-green-800'
                      : complete
                      ? 'bg-green-800/10 text-green-800 border-green-800/30'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {isHe ? section.titleHe : section.titleEn}
                  {complete && <IoCheckmarkCircle className="w-3.5 h-3.5 inline-block ml-1" />}
                </button>
              );
            })}
          </div>
        )}

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

        {step === 'form' && currentSectionData && (
          <QuestionnaireFormStep
            section={currentSectionData}
            isPerformanceSection={isPerformanceSection}
            ratingOptions={ratingOptions}
            isHe={isHe}
            isLastSection={currentSection === config.sections.length - 1}
            isFirstSection={currentSection === 0}
            answers={answers}
            onAnswer={handleAnswer}
            notes={notes}
            setNotes={setNotes}
            submitting={submitting}
            onPrev={() => {
              if (currentSection > 0) {
                setCurrentSection((p) => p - 1);
                window.scrollTo(0, 0);
              } else {
                setStep('register');
              }
            }}
            onNext={() => {
              setCurrentSection((p) => p + 1);
              window.scrollTo(0, 0);
            }}
            onSubmit={handleSubmit}
            PrevArrow={PrevArrow}
            NextArrow={NextArrow}
          />
        )}

        {step === 'success' && (
          <QuestionnaireSuccessStep
            isHe={isHe}
            respondentName={respondent.respondentName}
            respondentEmail={respondent.respondentEmail}
            BackArrow={BackArrow}
          />
        )}
      </main>
    </div>
  );
}
