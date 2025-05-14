import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-green-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-white mb-8 animate-bounce">
          404
        </h1>
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-lg transform -skew-y-6 animate-pulse"></div>
          <div className="relative bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              אופס! העמוד לא נמצא
            </h2>
            <p className="text-gray-600 mb-8">
              נראה שהגעת לעמוד שלא קיים. אולי הקישור שבור או שהעמוד הוסר.
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-orange-400 to-green-800 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-all duration-200 hover:shadow-lg"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
