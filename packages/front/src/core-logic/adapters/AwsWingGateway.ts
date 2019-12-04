import { from } from "rxjs";
import { API } from "aws-amplify";

import { Wing } from "@paralogs/shared";
import { WingGateway } from "../useCases/wings/port/WingGateway";

export class AwsWingGateway implements WingGateway {
  public retrieveWings() {
    return from(API.get("wings", "wings", null));
  }

  public addWing(wing: Wing) {
    return from(API.post("wings", "wings", { body: wing }));
  }
}
