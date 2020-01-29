import axios, { AxiosResponse } from "axios";
import {
  LoginParams,
  SignUpParams,
  WingDTO,
  CurrentUserWithAuthToken,
  UserDTO,
  CreateWingDTO,
} from "@paralogs/shared";
import { from } from "rxjs/internal/observable/from";
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs/internal/Observable";
import { config } from "../../config";

const responseToObservable = <Output>(
  axiosResponsePromise: Promise<AxiosResponse<Output>>,
) => from(axiosResponsePromise).pipe(map(({ data }) => data));

const createPostRequest = <Input, Output>(route: string) => (
  input: Input,
): Observable<Output> =>
  responseToObservable(axios.post<Output>(`${config.apiUrl}${route}`, input));

const createGetRequest = <Output>(route: string) => (): Observable<Output> =>
  responseToObservable(axios.get(`${config.apiUrl}${route}`));

export const httpClient = {
  signUp: createPostRequest<SignUpParams, CurrentUserWithAuthToken>("users/signup"),
  logIn: createPostRequest<LoginParams, CurrentUserWithAuthToken>("users/login"),
  logout: createGetRequest("users/logout"),
  retrieveUsers: createGetRequest<UserDTO[]>("users"),
  retrieveWings: createGetRequest<WingDTO[]>("wings"),
  addWing: createPostRequest<CreateWingDTO, WingDTO>("wings"),
};
