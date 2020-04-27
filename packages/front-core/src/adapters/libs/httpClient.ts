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
  getMeRoute,
  signUpRoute,
  loginRoute,
  usersRoute,
  wingsRoute,
  flightsRoute,
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

const GETwithToken = <Output>(route: string) => () => {
  const token = localClientStorage.get("token");
  return GET<Output>(route, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const POSTwithToken = <Input, Output>(route: string) => () => {
  const token = localClientStorage.get("token");
  return POST<Input, Output>(route, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const httpClient = {
  getMeRequested: GETwithToken<CurrentUserWithAuthToken>(getMeRoute),
  signUp: POST<SignUpParams, CurrentUserWithAuthToken>(signUpRoute),
  login: POST<LoginParams, CurrentUserWithAuthToken>(loginRoute),
  retrieveUsers: GETwithToken<UserDTO[]>(usersRoute),
  retrieveWings: GETwithToken<WingDTO[]>(wingsRoute),
  addWing: POSTwithToken<AddWingDTO, WingDTO>(wingsRoute),
  addFlight: POSTwithToken<AddFlightDTO, FlightDTO>(flightsRoute),
  retrieveFlights: GETwithToken<FlightDTO[]>(flightsRoute),
};
