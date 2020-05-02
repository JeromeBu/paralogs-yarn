import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { WingPersistence } from "./WingPersistence";

export const wingPersistenceMapper = {
  toPersistence: (wingEntity: WingEntity): WingPersistence => {
    const {
      uuid,
      userUuid,
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();
    return {
      id: wingEntity.getIdentity(),
      uuid,
      user_uuid: userUuid,
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil ?? null,
    };
  },
  toEntity: ({
    id,
    uuid,
    user_uuid,
    brand,
    model,
    owner_from,
    owner_until,
    flight_time_prior_to_own,
  }: WingPersistence): WingEntity => {
    const wingEntity = WingEntity.fromDTO({
      uuid,
      userUuid: user_uuid,
      brand,
      model,
      ownerFrom: owner_from,
      ownerUntil: owner_until ?? undefined,
      flightTimePriorToOwn: flight_time_prior_to_own,
    });

    wingEntity.setIdentity(id);
    return wingEntity;
  },
};
