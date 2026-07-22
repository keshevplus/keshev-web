import { Link } from 'react-router-dom';
import { IoCheckmarkCircle, IoClipboardOutline } from 'react-icons/io5';

interface Props {
  isHe: boolean;
  respondentName: string;
  respondentEmail: string;
  BackArrow: React.ComponentType<{ className?: string }>;
}

export default function QuestionnaireSuccessStep({ isHe, respondentName, respondentEmail, BackArrow }: Props) {
  return (
    <div className="rounded-xl border shadow-sm bg-white text-center py-10 px-6">
      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <IoCheckmarkCircle className="w-10 h-10 text-green-700" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-gray-900">
        {isHe ? 'השאלון נשלח בהצלחה!' : 'Questionnaire Submitted Successfully!'}
      </h2>
      <p className="text-gray-600 mb-2 max-w-md mx-auto">
        {isHe
          ? 'תודה על מילוי השאלון. הצוות שלנו יעבור על התוצאות ויצור עמכם קשר.'
          : 'Thank you for completing the questionnaire. Our team will review the results and contact you.'}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        {respondentName} - {respondentEmail}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <BackArrow className="w-4 h-4" />
          {isHe ? 'חזרה לאתר' : 'Return to Website'}
        </Link>
        <Link to="/#questionnaires" className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-800 text-white px-4 py-2 text-sm font-medium hover:bg-green-900">
          <IoClipboardOutline className="w-4 h-4" />
          {isHe ? 'לשאלונים נוספים' : 'More Questionnaires'}
        </Link>
      </div>
    </div>
  );
}
