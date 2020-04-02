import {
  FlightEntity,
  FlightPersistence,
} from "../../../../../domain/entities/FlightEntity";

export const flightPersistenceMapper = {
  toPersistence: (flightEntity: FlightEntity): FlightPersistence => {
    const { id, userId, wingId, date, duration, site, time } = flightEntity.getProps();
    return {
      id,
      user_id: userId,
      wing_id: wingId,
      date,
      duration,
      site,
      time: time || null,
    };
  },
  toEntity: (flightPersistence: FlightPersistence) => {
    return FlightEntity.createFromPersistence(flightPersistence);
  },
};
