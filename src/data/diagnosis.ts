import { PageContent } from '../types/content';

const diagnosisData: PageContent[] = [
  {
    heading: 'אבחון',
    subheading: 'אנו מספקים אבחון מקיף ומקצועי',
    body: [
      {
        title: 'שלב ראשון: פגישת היכרות',
        description: 'פגישה ראשונית להבנת הצרכים והאתגרים',
        image: '/images/diagnosis-step1.jpg',
      },
      {
        title: 'שלב שני: אבחון מקיף',
        description: 'ביצוע מבדקים מקצועיים והערכה',
        image: '/images/diagnosis-step2.jpg',
      },
      // Add other steps as needed
    ],
    additionalInfo: {
      heading: 'מידע נוסף',
      description: 'מידע חשוב על תהליך האבחון',
    }
  }
];

export default diagnosisData;
