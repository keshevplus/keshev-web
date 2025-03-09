export default function ADHD() {
  return (
    <div>
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1920&auto=format&fit=crop"
          alt="ADHD"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <h1 className="text-5xl font-bold text-white mb-4">מהי ADHD?</h1>
            <p className="text-xl text-white/90">הבנת הפרעת קשב וריכוז</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">הפרעת קשב וריכוז</h2>
            <div className="prose prose-lg">
              {/* Add your ADHD content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
