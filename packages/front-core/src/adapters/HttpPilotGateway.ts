import { UpdatePilotDTO } from "@paralogs/shared";
import { Observable } from "rxjs";
import { httpClient } from "./libs/httpClient";
import { PilotGateway } from "../useCases/pilot/gateways/PilotGateway";

export class HttpPilotGateway implements PilotGateway {
  public updateUser(params: UpdatePilotDTO): Observable<void> {
    return httpClient.updateUser()(params);
  }
}
