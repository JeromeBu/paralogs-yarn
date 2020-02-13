import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
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
import { LocalClientStorage } from "../LocalClientStorage";
import { ClientStorage } from "../../useCases/auth/port/ClientStorage";

const responseToObservable = <Output>(
  axiosResponsePromise: Promise<AxiosResponse<Output>>,
) => from(axiosResponsePromise).pipe(map(({ data }) => data));

const createPostRequest = <Input, Output>(
  route: string,
  axiosConfig?: AxiosRequestConfig,
) => (input: Input): Observable<Output> =>
  responseToObservable(
    axios.post<Output>(`${config.apiUrl}${route}`, input, axiosConfig),
  );

const createGetRequest = <Output>(
  route: string,
  axiosConfig?: AxiosRequestConfig,
) => (): Observable<Output> =>
  responseToObservable(axios.get(`${config.apiUrl}${route}`, axiosConfig));

const localClientStorage = new LocalClientStorage();

const withAuthTokenCreator = (clientStorage: ClientStorage) => <Output>(
  requestFunction: typeof createGetRequest,
  route: string,
) =>
  requestFunction<Output>(route, {
    headers: {
      authorization: `Bearer ${clientStorage.get("token")}`,
    },
  });

const withAuthToken = withAuthTokenCreator(localClientStorage);

export const httpClient = {
  signUp: createPostRequest<SignUpParams, CurrentUserWithAuthToken>("users/signup"),
  logIn: createPostRequest<LoginParams, CurrentUserWithAuthToken>("users/login"),
  logout: createGetRequest("users/logout"),
  retrieveUsers: createGetRequest<UserDTO[]>("users"),
  retrieveWings: withAuthToken<WingDTO[]>(createGetRequest, "wings"),
  addWing: createPostRequest<CreateWingDTO, WingDTO>("wings"),
};
