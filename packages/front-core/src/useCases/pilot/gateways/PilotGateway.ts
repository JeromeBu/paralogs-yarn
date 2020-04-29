import { UpdatePilotDTO } from "@paralogs/shared";
import { Observable } from "rxjs";

export interface PilotGateway {
  updateUser(params: UpdatePilotDTO): Observable<void>;
}
