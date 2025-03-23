import PageTitle from '../components/PageTitle';

export default function About() {
  return (
    <PageTitle title="אודותינו">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-right">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            קשב פלוס, נעים להכיר
          </h2>
          <p className="text-gray-600 text-lg md:text-2xl mt-4">
            רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר (ADHD/ADD)
            בילדים, בנוער ובמבוגרים. בעלת ניסיון רב בתחום הטיפולי, מאבחנת ומטפלת
            תוך שימוש בגישות טיפוליות מגוונות ומתקדמות. בוגרת לימודי רפואה
            באוניברסיטת בולוניה שבאיטליה, לאחר מכן סטאג' בתל השומר, התמחות
            ברפואת משפחה בקופ"ח מאוחדת, הסמכה לאבחון וטיפול בהפרעות קשב ופעלתנות
            יתר של משרד הבריאות.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mt-4">
            דר' איירין כוכב-רייפמן
          </h2>
        </div>
        <div className="flex justify-center">
          <img
            src="/assets/images/hero-about.jpeg"
            alt="Dr. Irine Kochav-Raifman"
            className="w-48 md:w-96 h-auto rounded-full"
          />
        </div>
      </div>
    </PageTitle>
  );
}
