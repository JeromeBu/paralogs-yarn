import { WingEntity } from "../../../../../domain/entities/WingEntity";
import { WingPersistence } from "./WingPersistence";

export const wingPersistenceMapper = {
  toPersistence: (wingEntity: WingEntity): WingPersistence => {
    const {
      id,
      userId,
      brand,
      model,
      flightTimePriorToOwn,
      ownerFrom,
      ownerUntil,
    } = wingEntity.getProps();
    return {
      surrogate_id: wingEntity.getIdentity(),
      id,
      user_id: userId,
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil ?? null,
    };
  },
  toEntity: ({
    surrogate_id,
    id,
    user_id,
    brand,
    model,
    owner_from,
    owner_until,
    flight_time_prior_to_own,
  }: WingPersistence): WingEntity => {
    const wingEntity = WingEntity.fromDTO({
      id,
      userId: user_id,
      brand,
      model,
      ownerFrom: owner_from,
      ownerUntil: owner_until ?? undefined,
      flightTimePriorToOwn: flight_time_prior_to_own,
    });

    wingEntity.setIdentity(surrogate_id);
    return wingEntity;
  },
};
