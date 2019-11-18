import { Observable } from "rxjs";
import { Wing } from "@paralogs/shared";

export interface WingGateway {
  retrieveWings(): Observable<Wing[]>;
  addWing(wing: Wing): Observable<Wing> /* QUESTION: return null, void or Wing ? */;
}
