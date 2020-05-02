import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";

export const flightPersistenceMapper = {
  toPersistence: (flightEntity: FlightEntity): FlightPersistence => {
    const {
      uuid,
      userUuid,
      wingUuid,
      date,
      duration,
      site,
      time,
    } = flightEntity.getProps();
    return {
      id: flightEntity.getIdentity(),
      uuid,
      user_uuid: userUuid,
      wing_uuid: wingUuid,
      date,
      duration,
      site,
      time: time || null,
    };
  },

  toEntity: ({
    id,
    uuid,
    wing_uuid,
    user_uuid,
    time,
    site,
    duration,
    date,
  }: FlightPersistence) => {
    const flightEntity = FlightEntity.fromDTO({
      uuid,
      userUuid: user_uuid,
      wingUuid: wing_uuid,
      time: time ?? undefined,
      site,
      duration,
      date,
    });
    flightEntity.setIdentity(id);
    return flightEntity;
  },
};
