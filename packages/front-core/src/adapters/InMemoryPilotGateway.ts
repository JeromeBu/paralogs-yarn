import { UpdatePilotDTO } from "@paralogs/shared";
import { Observable, of } from "rxjs";

import { PilotGateway } from "../useCases/pilot/gateways/PilotGateway";

export class InMemoryPilotGateway implements PilotGateway {
  // private _currentUserWithToken$ = new BehaviorSubject<CurrentUserWithAuthToken>(
  //   (undefined as unknown) as CurrentUserWithAuthToken,
  // );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateUser(params: UpdatePilotDTO): Observable<void> {
    return of(undefined);
  }
}
