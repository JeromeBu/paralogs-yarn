import { BehaviorSubject, of } from "rxjs";
import { WingDTO } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";

export class InMemoryWingGateway implements WingGateway {
  private _wings$ = new BehaviorSubject<WingDTO[]>([]);

  public retrieveWings() {
    return this._wings$;
  }

  public addWing(wing: WingDTO) {
    return of(wing);
  }

  get wings$() {
    return this._wings$;
  }
}
