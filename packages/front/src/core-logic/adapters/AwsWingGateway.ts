import { CreateWingDTO } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";
import { httpClient } from "./libs/httpClient";

export class AwsWingGateway implements WingGateway {
  public retrieveWings() {
    return httpClient.retrieveWings();
  }

  public addWing(createWingDto: CreateWingDTO) {
    return httpClient.addWing(createWingDto);
  }
}
