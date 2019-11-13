export interface CurrentUser {
  readonly email: string;
}

export interface CurrentUserWithToken extends CurrentUser {
  readonly token: string;
}
