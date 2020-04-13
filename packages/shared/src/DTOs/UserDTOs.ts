import * as Yup from "yup";
import { Flavor } from "../generalTypes/types";

export type UserId = Flavor<string, "UserId">;

export interface WithUserId {
  id: UserId;
}

export interface WithPassword {
  password: string;
}

export interface WithEmail {
  email: string;
}

export interface WithOtherInformations {
  firstName: string;
  lastName?: string;
}

export type UserDTO = WithUserId & WithEmail & WithOtherInformations;

export type CurrentUserWithAuthToken = {
  currentUser: UserDTO;
  token: string;
};

export type LoginParams = WithEmail & WithPassword;

export const loginSchema = Yup.object().shape<LoginParams>({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

export type SignUpParams = WithEmail & WithPassword & WithOtherInformations;

export const signUpSchema = Yup.object().shape<SignUpParams>({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .required()
    .min(8),
  firstName: Yup.string().required(),
  lastName: Yup.string(),
});
