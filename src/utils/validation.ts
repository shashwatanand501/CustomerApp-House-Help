export const isValidIndianPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPincode = (pincode: string) => /^\d{6}$/.test(pincode);
