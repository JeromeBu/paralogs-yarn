import { Observable } from "rxjs";
import { WingDTO, AddWingDTO } from "@paralogs/shared";

export interface WingGateway {
  retrieveWings(): Observable<WingDTO[]>;
  addWing(wing: AddWingDTO): Observable<WingDTO>;
  /* QUESTION: return null, void or WingDTO ? */
}
