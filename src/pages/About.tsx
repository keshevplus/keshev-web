export default function About() {
  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className=" w-full h-full object-cover">אודותינו</div>
        <div className="absolute text-center inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-4 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0">
            <h1 className="text-5xl font-bold text-white mb-4">אודותינו</h1>
            <p className="text-xl text-white/90"></p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-0 mb-12">
            <div className="text-center">
              <h2 className="text-5xl font-semibold mb-4">
                קשב פלוס, נעים להכיר
              </h2>
              <p className="text-gray-600 mb-4 text-2xl mt-4">
                רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר (ADHD/ADD)
                בילדים, בנוער ובמבוגרים.בעלת ניסיון רב בתחום הטיפולי, מאבחנת
                ומטפלת תוך שימוש בגישות טיפוליות מגוונות ומתקדמות.בוגרת לימודי
                רפואה באוניברסיטת בולוניה שבאיטליה, לאחר מכן סטאג' בתל השומר,
                התמחות ברפואת משפחה בקופ"ח מאוחדת, הסמכה לאבחון וטיפול בהפרעות
                קשב ופעלתנות יתר של משרד הבריאות.
              </p>{' '}
              <h2 className="text-3xl font-bold">דר' איירין כוכב-רייפמן</h2>
            </div>
            <img
              src="\assets\images\hero-about.jpeg"
              alt="John Smith"
              className="w-96 h-auto rounded-full mx-auto mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
