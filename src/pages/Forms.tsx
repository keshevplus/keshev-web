export default function Forms() {
  const pageTitles = [{ title: 'Default Title' }];
  const title = pageTitles[0].title;

  return (
    <div>
      <div className="rel mx-0 h-[0px]">
        <div className="relative inset-0">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
          </div>
        </div>
        <div className="prose prose-lg">
          <p>
            Here you can describe the various treatment options available at
            your facility.
          </p>
          <ul>
            <li>Option 1: Description of שאלונים option 1.</li>
            <li>Option 2: Description of שאלונים option 2.</li>
            <li>Option 3: Description of שאלונים option 3.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">אפשרויות שלנו</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
