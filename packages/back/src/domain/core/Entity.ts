export abstract class Entity {
  private surrogateId = -1;

  public setIdentity(surrogateId: number): void {
    this.surrogateId = surrogateId;
  }

  public hasIdentity(): boolean {
    return this.surrogateId > -1;
  }

  public getIdentity(): number {
    return this.surrogateId;
  }
}
