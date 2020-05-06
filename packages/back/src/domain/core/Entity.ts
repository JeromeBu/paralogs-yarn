export abstract class Entity<Props extends { uuid: string }> {
  private id = -1;

  protected constructor(protected props: Props) {}

  get uuid(): Props["uuid"] {
    return this.props.uuid;
  }

  public setIdentity(id: number): void {
    this.id = id;
  }

  public hasIdentity(): boolean {
    return this.id > -1;
  }

  public getIdentity(): number {
    return this.id;
  }

  public getProps(): Props {
    return this.props;
  }
}
