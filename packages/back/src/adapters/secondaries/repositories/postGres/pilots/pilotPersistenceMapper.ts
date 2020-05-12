import { combineEithers } from "@paralogs/back-shared";

import { PilotEntity } from "../../../../../domain/entities/PilotEntity";
import { PilotPersistence } from "./PilotPersistence";
import { PersonName } from "../../../../../domain/valueObjects/PersonName";

export const pilotPersistenceMapper = {
  toPersistence: (pilotEntity: PilotEntity): PilotPersistence => {
    const { firstName, lastName, uuid } = pilotEntity.getProps();
    return {
      id: pilotEntity.getIdentity(),
      uuid,
      first_name: firstName.value,
      ...(lastName ? { last_name: lastName.value } : {}),
    };
  },
  toEntity: (params: PilotPersistence): PilotEntity => {
    return combineEithers({
      firstName: PersonName.create(params.first_name),
      lastName: PersonName.create(params.last_name),
    })
      .map(validResults => {
        const pilotEntity = PilotEntity.fromDTO({
          uuid: params.uuid,
          ...validResults,
        });
        pilotEntity.setIdentity(params.id);
        return pilotEntity;
      })
      .ifLeft(error => {
        throw error;
      })
      .extract() as PilotEntity;
  },
};
