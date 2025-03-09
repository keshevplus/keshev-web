export default function Treatment() {
  return (
    <div>
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1920&auto=format&fit=crop"
          alt="Treatment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <h1 className="text-5xl font-bold text-white mb-4">טיפול</h1>
            <p className="text-xl text-white/90">אפשרויות הטיפול שלנו</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">אפשרויות טיפול</h2>
            <div className="prose prose-lg">
              <p>
                Here you can describe the various treatment options available at
                your facility.
              </p>
              <ul>
                <li>Option 1: Description of treatment option 1.</li>
                <li>Option 2: Description of treatment option 2.</li>
                <li>Option 3: Description of treatment option 3.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
