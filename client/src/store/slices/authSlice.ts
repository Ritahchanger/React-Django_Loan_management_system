import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
  amount_invested: number | null;
}

const initialState: AuthState = {
  isAuthenticated: !!sessionStorage.getItem("authToken"),
  token: sessionStorage.getItem("authToken"),
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")!)
    : null,
  amount_invested: sessionStorage.getItem("amount_invested")
    ? JSON.parse(sessionStorage.getItem("amount_invested")!)
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

      state.amount_invested = Number(action.payload.user.investment_amount);

      sessionStorage.setItem(
        "amount_invested",
        JSON.stringify(action.payload.user.investment_amount)
      );
      sessionStorage.setItem("authToken", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.amount_invested = null;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("amount_invested");
    },

    decrementInvestment(state, action: PayloadAction<any>) {
      if (state.amount_invested !== null) {
        state.amount_invested = Math.max(
          0,
          state.amount_invested - action.payload.amount
        );
        sessionStorage.setItem(
          "amount_invested",
          JSON.stringify(state.amount_invested)
        );

        if (state.user) {
          state.user.investment_amount = state.amount_invested.toString();
          sessionStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },

    incrementInvestment(state, action: PayloadAction<any>) {
      if (state.amount_invested !== null) {
        state.amount_invested += action.payload.amount;
        sessionStorage.setItem(
          "amount_invested",
          JSON.stringify(state.amount_invested)
        );

        if (state.user) {
          state.user.investment_amount = state.amount_invested.toString();
          sessionStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },
});

export const {
  login,
  logout,
  decrementInvestment,
  incrementInvestment,
} = authSlice.actions;

export default authSlice;
