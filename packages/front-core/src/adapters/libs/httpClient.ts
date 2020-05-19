import {
  AddFlightDTO,
  AddWingDTO,
  currentPilotRoute,
  CurrentUserWithAuthToken,
  FlightDTO,
  flightsRoute,
  getMeRoute,
  LoginParams,
  loginRoute,
  SignUpParams,
  signUpRoute,
  UpdateUserDTO,
  UpdateWingDTO,
  UserDTO,
  usersRoute,
  WingDTO,
  wingsRoute,
} from "@paralogs/shared";
import { PilotDTO } from "@paralogs/shared/dist/src/DTOs/PilotDTOs";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable } from "rxjs/internal/Observable";
import { from } from "rxjs/internal/observable/from";
import { map } from "rxjs/internal/operators/map";

import { config } from "../../config";
import { LocalClientStorage } from "../LocalClientStorage";

const responseToObservable = <Output>(
  axiosResponsePromise: Promise<AxiosResponse<Output>>,
) => from(axiosResponsePromise).pipe(map(({ data }) => data));

const POST = <Input, Output>(
  route: string,
  axiosConfig?: AxiosRequestConfig,
) => (input: Input): Observable<Output> =>
  responseToObservable(axios.post<Output>(route, input, axiosConfig));

const PUT = <Input, Output>(
  route: string,
  axiosConfig?: AxiosRequestConfig,
) => (input: Input): Observable<Output> =>
  responseToObservable(axios.put<Output>(route, input, axiosConfig));

const GET = <Output>(
  route: string,
  axiosConfig?: AxiosRequestConfig,
) => (): Observable<Output> =>
  responseToObservable(axios.get(route, axiosConfig));

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

const PUTwithToken = <Input, Output>(route: string) => () => {
  const token = localClientStorage.get("token");
  return PUT<Input, Output>(route, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const paragliding = (route: string) => `${config.paraglidingUrl}${route}`;
const auth = (route: string) => `${config.authUrl}${route}`;

export const httpClient = {
  getMe: GETwithToken<CurrentUserWithAuthToken>(auth(getMeRoute)),
  signUp: POST<SignUpParams, CurrentUserWithAuthToken>(auth(signUpRoute)),
  login: POST<LoginParams, CurrentUserWithAuthToken>(auth(loginRoute)),

  updateUser: PUTwithToken<UpdateUserDTO, UserDTO>(auth(usersRoute)),
  retrieveUsers: GETwithToken<UserDTO[]>(auth(usersRoute)),

  retrieveCurrentPilot: GETwithToken<PilotDTO>(paragliding(currentPilotRoute)),

  retrieveWings: GETwithToken<WingDTO[]>(paragliding(wingsRoute)),
  addWing: POSTwithToken<AddWingDTO, WingDTO>(paragliding(wingsRoute)),
  updateWing: PUTwithToken<UpdateWingDTO, WingDTO>(paragliding(wingsRoute)),

  addFlight: POSTwithToken<AddFlightDTO, FlightDTO>(paragliding(flightsRoute)),
  retrieveFlights: GETwithToken<FlightDTO[]>(paragliding(flightsRoute)),
};
