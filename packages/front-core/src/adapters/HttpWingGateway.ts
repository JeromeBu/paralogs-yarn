import { AddWingDTO } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";
import { httpClient } from "./libs/httpClient";

export class HttpWingGateway implements WingGateway {
  public retrieveWings() {
    return httpClient.retrieveWings()();
  }

  public addWing(addWingDto: AddWingDTO) {
    return httpClient.addWing()(addWingDto);
  }
}
