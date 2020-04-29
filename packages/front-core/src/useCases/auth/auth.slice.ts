import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentUserWithAuthToken,
  LoginParams,
  SignUpParams,
  StringError,
  UpdateUserDTO,
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
    logoutRequested: startLoading<void>(),
    logoutSucceeded: state => ({
      ...state,
      isLoading: false,
      currentUser: null,
      token: null,
    }),

    getMeRequested: startLoading<void>(),
    getMeFailed: setError,

    signUpRequested: startLoading<SignUpParams>(),
    signUpFailed: setError,

    loginRequested: startLoading<LoginParams>(),
    loginFailed: setError,

    authenticationSucceeded: (
      state,
      action: PayloadAction<CurrentUserWithAuthToken>,
    ) => ({
      ...state,
      isLoading: false,
      error: undefined,
      ...action.payload,
    }),

    updateUserRequested: startLoading<UpdateUserDTO>(),
    updateUserSucceeded: (state, action: PayloadAction<UpdateUserDTO>) => ({
      ...state,
      currentUser: state.currentUser && { ...state.currentUser, ...action.payload },
      isLoading: false,
    }),
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;

export type AuthAction = ReturnType<ValueOf<typeof authActions>>;
