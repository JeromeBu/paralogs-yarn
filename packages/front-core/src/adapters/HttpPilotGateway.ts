import { UpdatePilotDTO } from "@paralogs/shared";
import { Observable } from "rxjs";

import { PilotGateway } from "../useCases/pilot/gateways/PilotGateway";
import { httpClient } from "./libs/httpClient";

export class HttpPilotGateway implements PilotGateway {
  public updateUser(params: UpdatePilotDTO): Observable<void> {
    return httpClient.updateUser()(params);
  }
}
