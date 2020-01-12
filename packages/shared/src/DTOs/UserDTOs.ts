interface WithId {
  id: string;
}

interface WithPassword {
  password: string;
}

interface WithEmail {
  email: string;
}

interface WithOtherInformations {
  firstName: string;
  lastName?: string;
}

export type UserDTO = WithId & WithEmail & WithOtherInformations;

export type CurrentUserWithAuthToken = {
  currentUser: UserDTO;
  token: string;
};

export type LoginParams = WithEmail & WithPassword;

export type SignUpParams = WithEmail & WithPassword & WithOtherInformations;
