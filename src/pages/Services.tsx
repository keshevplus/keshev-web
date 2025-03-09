export default function Services() {
  const services = [
    {
      title: 'אבחון מקיף של הפרעות קשב ופעלתנות יתר',
      description: 'אבחון מקיף ומקצועי המותאם אישית לכל מטופל',
      image:
        'https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8c6_service-1.jpg',
    },
    {
      title: 'טיפול פסיכולוגי',
      description: 'טיפול פסיכולוגי פרטני ומשפחתי',
      image:
        'https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8c7_service-2.jpg',
    },
    {
      title: 'הדרכת הורים',
      description: 'הדרכה וכלים להתמודדות עם אתגרי ההורות',
      image:
        'https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8c8_service-3.jpg',
    },
    {
      title: 'טיפול תרופתי',
      description: 'ליווי וייעוץ בנושא טיפול תרופתי',
      image:
        'https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8c9_service-4.jpg',
    },
  ];

  return (
    <div>
      <div className="relative h-[100px] mt-2">
        {/* <img
          src="https://uploads-ssl.webflow.com/65a0c8d7e8c1d2c0e4f0b8c2/65a0c8d7e8c1d2c0e4f0b8ca_services-hero.jpg"
          alt="Services"
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <h1 className="text-5xl font-bold text-white mb-4">
              השירותים שלנו
            </h1>
            <p className="text-xl text-white/90">
              פתרונות מקצועיים לאבחון וטיפול בהפרעות קשב
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
