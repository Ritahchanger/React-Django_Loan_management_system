import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: !!sessionStorage.getItem("authToken"),
  token: sessionStorage.getItem("authToken"),
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      sessionStorage.setItem("authToken", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
    },
    decrementInvestment(state, action: PayloadAction<number>) {
      const currentAmount = parseFloat(state.user.investment_amount) || 0;
      const deduction = action.payload;

      const updatedInvestment = Math.max(0, currentAmount - deduction);

      const newUser = {
        ...state.user,
        investment_amount: updatedInvestment.toString(),
      };

      // Update session storage
      sessionStorage.setItem("user", JSON.stringify(newUser));

      // Update Redux state
      state.user = newUser;
    },
  },
});

export const { login, logout, decrementInvestment } = authSlice.actions;
export default authSlice;
