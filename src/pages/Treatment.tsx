export default function Treatment() {
  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="absolute text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0">
            <h1 className="text-5xl  font-bold text-white mx-4 ">טיפול</h1>
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
