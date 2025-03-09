import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-[#f4db9]">
      <div className="relative h-screen">
        <img
          src="https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8c4_hero-image.jpg"
          alt="קשב פלוס"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <Link to="/" className="flex items-center">
              <img
                src="\assets\images\logo.png"
                alt="קשב"
                className="h-80 w-auto"
              />
            </Link>

            <p className="text-2xl text-white/90 mb-12 max-w-2xl">
              מרפאה לאבחון וטיפול בהפרעות קשב ופעלתנות יתר בילדים ומבוגרים
            </p>
            <Link
              to="/contact"
              className="bg-[#FF4D4D] text-white px-12 py-5 rounded-full text-xl font-medium hover:bg-[#FF3333] transition-colors"
            >
              צור קשר
            </Link>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">השירותים שלנו</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול
              בהפרעות קשב
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'אבחון מקיף',
                description: 'אבחון מקיף של הפרעות קשב ופעלתנות יתר',
                icon: '🔍',
              },
              {
                title: 'טיפול פסיכולוגי',
                description: 'טיפול פסיכולוגי פרטני ומשפחתי',
                icon: '💭',
              },
              {
                title: 'הדרכת הורים',
                description: 'הדרכה וכלים להתמודדות עם אתגרי ההורות',
                icon: '👨‍👩‍👧‍👦',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Contact CTA */}
      <div className="py-24 bg-[#FF4D4D]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            מעוניינים לקבוע פגישת ייעוץ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#FF4D4D] px-12 py-5 rounded-full text-xl font-medium hover:bg-gray-100 transition-colors"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </div>
  );
}
