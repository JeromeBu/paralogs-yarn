import { from } from "rxjs";
import { API } from "aws-amplify";

import { CreateWingDTO } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";

export class AwsWingGateway implements WingGateway {
  public retrieveWings() {
    return from(API.get("wings", "wings", null));
  }

  public addWing(createWingDto: CreateWingDTO) {
    return from(API.post("wings", "wings", { body: createWingDto }));
  }
}
