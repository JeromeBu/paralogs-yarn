import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import {
  LoginParams,
  SignUpParams,
  WingDTO,
  CurrentUserWithAuthToken,
  UserDTO,
  AddWingDTO,
  AddFlightDTO,
  FlightDTO,
} from "@paralogs/shared";
import { from } from "rxjs/internal/observable/from";
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs/internal/Observable";
import { config } from "../../config";
import { LocalClientStorage } from "../LocalClientStorage";

const responseToObservable = <Output>(
  axiosResponsePromise: Promise<AxiosResponse<Output>>,
) => from(axiosResponsePromise).pipe(map(({ data }) => data));

const POST = <Input, Output>(route: string, axiosConfig?: AxiosRequestConfig) => (
  input: Input,
): Observable<Output> =>
  responseToObservable(
    axios.post<Output>(`${config.apiUrl}${route}`, input, axiosConfig),
  );

const GET = <Output>(route: string, axiosConfig?: AxiosRequestConfig) => (): Observable<
  Output
> => responseToObservable(axios.get(`${config.apiUrl}${route}`, axiosConfig));

const localClientStorage = new LocalClientStorage();

const GETwithToken = <Output>(route: string) =>
  GET<Output>(route, {
    headers: {
      authorization: `Bearer ${localClientStorage.get("token")}`,
    },
  });

const POSTwithToken = <Input, Output>(route: string) =>
  POST<Input, Output>(route, {
    headers: {
      authorization: `Bearer ${localClientStorage.get("token")}`,
    },
  });

export const httpClient = {
  getMe: GETwithToken("users/getme"),
  signUp: POST<SignUpParams, CurrentUserWithAuthToken>("users/signup"),
  login: POST<LoginParams, CurrentUserWithAuthToken>("users/login"),
  retrieveUsers: GETwithToken<UserDTO[]>("users"),
  retrieveWings: GETwithToken<WingDTO[]>("wings"),
  addWing: POSTwithToken<AddWingDTO, WingDTO>("wings"),
  addFlight: POSTwithToken<AddFlightDTO, FlightDTO>("flights"),
  retrieveFlights: GETwithToken<FlightDTO[]>("flights"),
};
