import * as Yup from "yup";

export interface PilotDTO {
  firstName: string;
  lastName?: string;
}

export type UpdatePilotDTO = Partial<PilotDTO>;

export const updateUserSchema = Yup.object().shape<UpdatePilotDTO>({
  firstName: Yup.string(),
  lastName: Yup.string(),
});
