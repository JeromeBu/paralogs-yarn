// import { API } from "aws-amplify";
import { BehaviorSubject, of } from "rxjs";

import { Wing } from "@paralogs/shared";

import { WingGateway } from "../useCases/wings/port/WingsGateway";

export class AwsWingGateway implements WingGateway {
  private _wings$ = new BehaviorSubject<Wing[]>([]);

  public retrieveWings() {
    // API.get("wings", "wings", null).then(res => console.log(res));
    return this._wings$;
  }

  public addWing(wing: Wing) {
    return of(wing);
  }

  get wings$() {
    return this._wings$;
  }
}
