type TContact = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  tags: string[];
};

type TContactTag = {
  label: string;
  value: string;
};

export type { TContact, TContactTag };
