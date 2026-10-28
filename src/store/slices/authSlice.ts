import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type AuthState = {
    isLoggedIn: boolean;
    token: string | null;
    // Token held after OTP for a new user, until their profile is created
    pendingToken: string | null;
}
const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    pendingToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<string | undefined>) {
            state.isLoggedIn = true;
            state.token = action.payload ?? null; // Store the token passed in the action
            state.pendingToken = null;
        },
        setPendingToken(state, action: PayloadAction<string | null>) {
            state.pendingToken = action.payload;
        },
        signOut(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.pendingToken = null;
        }
    }
})

export const { signIn, setPendingToken, signOut } = authSlice.actions;
export default authSlice.reducer;
