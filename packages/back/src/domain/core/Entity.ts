export abstract class Entity<Props extends { uuid: string }> {
  private surrogateId = -1;

  protected constructor(protected props: Props) {}

  get uuid(): Props["uuid"] {
    return this.props.uuid;
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
