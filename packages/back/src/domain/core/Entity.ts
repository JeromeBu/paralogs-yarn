import { Flavor } from "@paralogs/shared";

export abstract class Entity<Props extends { id: Flavor<string, string> }> {
  private surrogateId = -1;

  protected constructor(protected props: Props) {}

  get id(): Props["id"] {
    return this.props.id;
  }

  public setIdentity(surrogateId: number): void {
    this.surrogateId = surrogateId;
  }

  public hasIdentity(): boolean {
    return this.surrogateId > -1;
  }

  public getIdentity(): number {
    return this.surrogateId;
  }

  public getProps(): Props {
    return this.props;
  }
}
