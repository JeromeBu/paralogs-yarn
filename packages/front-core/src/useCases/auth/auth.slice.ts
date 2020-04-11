import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentUserWithAuthToken,
  LoginParams,
  SignUpParams,
  StringError,
  UserDTO,
  ValueOf,
} from "@paralogs/shared";

type AuthState = Readonly<{
  error?: StringError;
  isLoading: boolean;
  currentUser: UserDTO | null;
  token: string | null;
}>;

const initialState: AuthState = {
  isLoading: false,
  currentUser: null,
  token: null,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const startLoading = <P>() => (state: AuthState, action: PayloadAction<P>) => ({
  ...state,
  isLoading: true,
});

const setError = (state: AuthState, action: PayloadAction<StringError>) => ({
  ...state,
  error: action.payload,
  isLoading: false,
  token: null,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: startLoading<void>(),
    logoutSuccess: state => ({
      ...state,
      isLoading: false,
      currentUser: null,
      token: null,
    }),

    getMe: startLoading<void>(),
    getMeError: setError,

    signUpRequest: startLoading<SignUpParams>(),
    signUpError: setError,

    loginRequest: startLoading<LoginParams>(),
    loginError: setError,

    setCurrentUserAndAuthToken: (
      state,
      action: PayloadAction<CurrentUserWithAuthToken>,
    ) => {
      return { ...state, isLoading: false, error: undefined, ...action.payload };
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;

export type AuthAction = ReturnType<ValueOf<typeof authActions>>;
