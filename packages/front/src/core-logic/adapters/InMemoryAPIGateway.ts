import { BehaviorSubject, of } from "rxjs";

import { Flight, Wing } from "@paralogs/shared";

import { Config } from "../config";
import { CurrentUserWithToken } from "../useCases/currentUser/currentUser.types";
import { APIGateway, AuthParams } from "../useCases/api.gateway";
import { flightsFixtures } from "../useCases/flights/flights.fixtures";

const testConfig: Config = { fakeBackend: false, withFixtures: false };
export class InMemoryAPIGateway implements APIGateway {
  private _currentUser$ = new BehaviorSubject<CurrentUserWithToken | null>(null);
  private _flights$ = new BehaviorSubject<Flight[]>(
    this.config.withFixtures ? flightsFixtures : [],
  );
  private _wings$ = new BehaviorSubject<Wing[]>([]);

  constructor(private config: Config = testConfig) {}

  public getCurrentSession() {
    return of({ message: "In memory session, fake response" });
  }

  login(params: AuthParams) {
    this.authFakeHttpResponses(params);
    return this._currentUser$;
  }
  signUp(params: AuthParams) {
    this.authFakeHttpResponses(params);
    return this._currentUser$;
  }

  public loggout() {
    return of();
  }

  get currentUser$() {
    return this._currentUser$;
  }

  retrieveFlights() {
    return this._flights$;
  }

  addFlight(flight: Flight) {
    this.addFlightFakeHttpResponses(flight);
    return of(null);
  }

  addWing(wing: Wing) {
    return of(wing);
  }

  get flights$() {
    return this._flights$;
  }

  get wings$() {
    return this._wings$;
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
