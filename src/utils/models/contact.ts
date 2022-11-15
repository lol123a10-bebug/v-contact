type TContact = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  tags: string[];
};

type TContactCreate = Omit<TContact, "id">;

type TContactTag = {
  label: string;
  value: string;
};

export type { TContact, TContactTag, TContactCreate };
