import { BehaviorSubject, of } from "rxjs";

import { Wing } from "@paralogs/shared";

import { WingGateway } from "../useCases/wings/port/WingGateway";

export class InMemoryWingGateway implements WingGateway {
  private _wings$ = new BehaviorSubject<Wing[]>([]);

  public retrieveWings() {
    return this._wings$;
  }

  public addWing(wing: Wing) {
    return of(wing);
  }

  get wings$() {
    return this._wings$;
  }
}
