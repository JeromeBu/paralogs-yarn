import * as Yup from "yup";
import { Flavor } from "../generalTypes/types";
import { PilotDTO } from "./PilotDTOs";

export type UserUuid = Flavor<string, "UserUuid">;

export interface WithUuid {
  uuid: UserUuid;
}

export interface WithUserUuid {
  userUuid: UserUuid;
}

export interface WithPassword {
  password: string;
}

export interface WithEmail {
  email: string;
}

export type UserDTO = WithUuid & WithEmail;

export type CurrentUserWithAuthToken = {
  currentUser: UserDTO;
  pilotInformation: PilotDTO;
  token: string;
};

export type LoginParams = WithEmail & WithPassword;

export const loginSchema = Yup.object().shape<LoginParams>({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

export type SignUpParams = WithEmail & WithPassword & PilotDTO;

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
