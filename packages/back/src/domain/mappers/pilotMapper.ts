import { PilotDTO } from "@paralogs/shared";
import { PilotEntity } from "../entities/PilotEntity";

export const pilotMapper = {
  entityToDTO: (userEntity: PilotEntity): PilotDTO => {
    const { uuid, firstName, lastName } = userEntity.getProps();

    return {
      uuid,
      firstName: firstName.value,
      ...(lastName ? { lastName: lastName.value } : {}),
    };
  },
};
