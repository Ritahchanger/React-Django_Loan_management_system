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
    decrementInvestment(state, action: PayloadAction<any>) {
      let userInvestment = state.user.investment_amount;

      userInvestment = userInvestment - action.payload.amount;

      state.user = { ...state.user, investment_amount: userInvestment };

    },
  },
});

export const { login, logout, decrementInvestment } = authSlice.actions;
export default authSlice;
