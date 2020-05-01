import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";

export const flightPersistenceMapper = {
  toPersistence: (flightEntity: FlightEntity): FlightPersistence => {
    const { id, userId, wingId, date, duration, site, time } = flightEntity.getProps();
    return {
      surrogate_id: flightEntity.getIdentity(),
      id,
      user_id: userId,
      wing_id: wingId,
      date,
      duration,
      site,
      time: time || null,
    };
  },

  toEntity: ({
    surrogate_id,
    id,
    wing_id,
    user_id,
    time,
    site,
    duration,
    date,
  }: FlightPersistence) => {
    const flightEntity = FlightEntity.fromDTO({
      id,
      userId: user_id,
      wingId: wing_id,
      time: time ?? undefined,
      site,
      duration,
      date,
    });
    flightEntity.setIdentity(surrogate_id);
    return flightEntity;
  },
};
