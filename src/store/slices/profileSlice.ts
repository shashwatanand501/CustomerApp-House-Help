import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, UserProfile } from '@/types/user';

export type ProfileState = {
    user: UserProfile;
    addresses: Address[];
}

// Placeholder data until the profile comes from the API
const initialState: ProfileState = {
    user: {
        name: 'Ananya Sharma',
        phone: '+91 98765 43210',
        email: 'ananya.sharma@example.com',
    },
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
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<ProfileState>) {
            state.user = action.payload.user;
            state.addresses = action.payload.addresses;
        },
        updateProfile(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
        addAddress(state, action: PayloadAction<Omit<Address, 'id'>>) {
            state.addresses.push({ ...action.payload, id: `addr-${Date.now()}` });
        },
        removeAddress(state, action: PayloadAction<string>) {
            state.addresses = state.addresses.filter((address) => address.id !== action.payload);
        },
    }
})

export const { setProfile, updateProfile, addAddress, removeAddress } = profileSlice.actions;
export default profileSlice.reducer;
