import { AddWingDTO, WingDTO } from "@paralogs/shared";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { WingGateway } from "../useCases/wings/port/WingGateway";

export class InMemoryWingGateway implements WingGateway {
  private _wings$ = new BehaviorSubject<WingDTO[]>([]);

  public retrieveWings() {
    return this._wings$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addWing(addWingDto: AddWingDTO) {
    return this._wings$.pipe(map(wings => wings.find(({ id }) => id === addWingDto.id)!));
  }

  get wings$() {
    return this._wings$;
  }
}
