export interface RespondentInfo {
  respondentName: string;
  respondentEmail: string;
  respondentPhone: string;
  childName: string;
  childAge: string;
  childGender: string;
  relationship: string;
}

export const EMPTY_RESPONDENT: RespondentInfo = {
  respondentName: '',
  respondentEmail: '',
  respondentPhone: '',
  childName: '',
  childAge: '',
  childGender: '',
  relationship: '',
};
