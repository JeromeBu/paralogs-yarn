export abstract class Entity<Props extends { id: string }> {
  private surrogateId = -1;

  protected constructor(protected props: Props) {}

  get id() {
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
