import { Observable } from "rxjs";
import { WingDTO, AddWingDTO, UpdateWingDTO } from "@paralogs/shared";

export interface WingGateway {
  retrieveWings(): Observable<WingDTO[]>;
  addWing(wing: AddWingDTO): Observable<WingDTO>;
  updateWing(updateParams: UpdateWingDTO): Observable<WingDTO>;
  /* QUESTION: return null, void or WingDTO ? */
}
