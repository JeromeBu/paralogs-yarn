import { BehaviorSubject, of } from "rxjs";
import { WingDTO, AddWingDTO, uuid } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";

export class InMemoryWingGateway implements WingGateway {
  private _wings$ = new BehaviorSubject<WingDTO[]>([]);

  public retrieveWings() {
    return this._wings$;
  }

  public addWing(addWingDto: AddWingDTO) {
    const wingDto: WingDTO = { ...addWingDto, userId: uuid() };
    return of(wingDto);
  }

  get wings$() {
    return this._wings$;
  }
}
