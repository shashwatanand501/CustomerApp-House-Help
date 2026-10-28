import { Address, UserProfile } from '@/types/user';

export interface VerifyOtpResponse {
    token: string;
    // Backend flag: true when this phone number has no account yet
    isNewUser: boolean;
    user?: UserProfile;
    addresses?: Address[];
}

export interface CreateProfilePayload {
    name: string;
    email: string;
    phone: string;
    address: Omit<Address, 'id'>;
}

// ---------------- Mock backend ----------------
// TODO: replace these with real API calls from src/api
// Demo rules: OTP is always 1234. 9876543210 is an existing user, every other number is new.
const MOCK_OTP = '1234';
const MOCK_EXISTING_USERS: Record<string, { user: UserProfile; addresses: Address[] }> = {
    '9876543210': {
        user: { name: 'Ananya Sharma', phone: '+91 98765 43210', email: 'ananya.sharma@example.com' },
        addresses: [
            {
                id: 'addr-1',
                label: 'Home',
                line1: 'Flat 302, Green Residency',
                line2: 'Sector 21',
                city: 'Gurugram',
                pincode: '122016',
            },
        ],
    },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendOtp(phone: string): Promise<void> {
    await delay(700);
    console.log(`[mock] OTP for ${phone} is ${MOCK_OTP}`);
}

export async function verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
    await delay(700);
    if (otp !== MOCK_OTP) {
        throw new Error('Incorrect OTP. Please try again.');
    }

    const existing = MOCK_EXISTING_USERS[phone];
    const token = `mock-token-${phone}`;
    return existing
        ? { token, isNewUser: false, user: existing.user, addresses: existing.addresses }
        : { token, isNewUser: true };
}

export async function createProfile(
    token: string,
    payload: CreateProfilePayload
): Promise<{ user: UserProfile; addresses: Address[] }> {
    await delay(700);
    return {
        user: { name: payload.name, email: payload.email, phone: payload.phone },
        addresses: [{ ...payload.address, id: `addr-${Date.now()}` }],
    };
}
