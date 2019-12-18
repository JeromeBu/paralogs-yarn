import { Observable } from "rxjs";
import { WingDTO, CreateWingDTO } from "@paralogs/shared";

export interface WingGateway {
  retrieveWings(): Observable<WingDTO[]>;
  addWing(wing: CreateWingDTO): Observable<WingDTO>;
  /* QUESTION: return null, void or WingDTO ? */
}
