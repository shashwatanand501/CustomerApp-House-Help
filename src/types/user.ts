export interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

export type AddressLabel = 'Home' | 'Work' | 'Other';

export interface Address {
  id: string;
  label: AddressLabel;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
}
