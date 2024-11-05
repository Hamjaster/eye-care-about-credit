export type ClientType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  suffix?: string;
  ssn: string;
  dob: null | Date;
  mailingAddress?: string;
  country: string;
  city?: string;
  state: string;
  zipCode?: string;
  phoneMobile: string;
  phoneAlternate?: string;
  fax?: string;
  status: string;
  startDate: null | Date;
  added: Date;
  assignedTo: string;
  referredBy: string;
  password?: string;
};
export type LetterType = {
  id: string;
  title: string;
  status: string;
  category: string;
  description?: string;
  favorite?: boolean;
  document?: any;
};

export interface DisputeItem {
  id: string;
  creditor: string;
  accountNumbers: {
    equifax?: string;
    experian?: string;
    transunion?: string;
  };
  bureaus: string[];
  reason: string;
  instruction: string;
}

export type DisputeWizardType = {
  photoId: any;
  proofOfAddress: any;
  disputeItems: DisputeItem[];
  selectedLetters: LetterType[];
};
