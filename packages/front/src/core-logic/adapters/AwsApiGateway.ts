import { Auth, API } from "aws-amplify";
import { BehaviorSubject, of, from } from "rxjs";

import { Flight } from "@paralogs/shared";

import { Config } from "../config";
import { CurrentUserWithToken } from "../useCases/currentUser/currentUser.types";
import { APIGateway, AuthParams } from "../useCases/api.gateway";
import { flightsFixtures } from "../useCases/flights/flights.fixtures";

const testConfig: Config = { fakeBackend: false, withFixtures: false };

export class AwsAPIGateway implements APIGateway {
  private _currentUser$ = new BehaviorSubject<CurrentUserWithToken | null>(null);
  private _flights$ = new BehaviorSubject<Flight[]>(
    this.config.withFixtures ? flightsFixtures : [],
  );

  constructor(private config: Config = testConfig) {}

  public getCurrentSession() {
    try {
      return from(Auth.currentSession());
    } catch (e) {
      if (e !== "No current user") {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      return of({ message: "No current user" });
    }
  }

  public login(params: AuthParams) {
    const { email, password } = params;
    // eslint-disable-next-line no-console
    console.log({ email, password });

    try {
      Auth.signIn(email, password)
        .then(response => {
          // eslint-disable-next-line no-console
          console.log({ response });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("error on loggin : ", { error });
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
    this._currentUser$.next({ email, token: "some fake token" });
    return this._currentUser$;
  }

  public signUp(params: AuthParams) {
    this.authFakeHttpResponses(params);
    return this._currentUser$;
  }

  public loggout() {
    return from(Auth.signOut());
  }

  get currentUser$() {
    return this._currentUser$;
  }

  retrieveFlights() {
    // eslint-disable-next-line no-console
    API.get("notes", "notes", null).then(res => console.log(res));
    return this._flights$;
  }

  addFlight(flight: Flight) {
    this.addFlightFakeHttpResponses(flight);
    return of(null);
  }

  get flights$() {
    return this._flights$;
  }

  private addFlightFakeHttpResponses(flight: Flight) {
    if (this.config.fakeBackend) {
      // eslint-disable-next-line no-console
      console.log("fake backend update of flights");
      this._flights$.next([flight, ...this._flights$.value]);
    }
  }

  private authFakeHttpResponses(params: AuthParams) {
    if (this.config.fakeBackend) {
      this._currentUser$.next({ email: params.email, token: "someFakeToken" });
    }
  }
}
