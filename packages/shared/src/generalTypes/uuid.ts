// eslint-disable-next-line
import uuidV4 from "uuid/v4";

export const uuid = uuidV4;

export const isUuid = (str: string): boolean =>
  !!str.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );

export interface UuidGenerator {
  generate: () => string;
}

export class FakeUuidGenerator implements UuidGenerator {
  private uuid: string;

  constructor(fakeId: string) {
    this.uuid = fakeId;
  }

  public generate() {
    return this.uuid;
  }
}

export class ActualUuidGenerator implements UuidGenerator {
  public generate() {
    return uuid();
  }
}
