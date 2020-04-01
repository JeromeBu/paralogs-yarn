import { WingEntity, WingPersistence } from "../../../../../domain/entities/WingEntity";

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
      id,
      user_id: userId,
      brand,
      model,
      flight_time_prior_to_own: flightTimePriorToOwn,
      owner_from: ownerFrom,
      owner_until: ownerUntil ?? null,
    };
  },
  toEntity: (wingPersistence: WingPersistence) => {
    return WingEntity.createFromPersistence(wingPersistence);
  },
};
