export interface RespondentInfo {
  respondentFirstName: string;
  respondentLastName: string;
  respondentName: string;
  respondentEmail: string;
  respondentPhone: string;
  childFirstName: string;
  childLastName: string;
  childName: string;
  childAge: string;
  childGender: string;
  relationship: string;
}

export const EMPTY_RESPONDENT: RespondentInfo = {
  respondentFirstName: '',
  respondentLastName: '',
  respondentName: '',
  respondentEmail: '',
  respondentPhone: '',
  childFirstName: '',
  childLastName: '',
  childName: '',
  childAge: '',
  childGender: '',
  relationship: '',
};
