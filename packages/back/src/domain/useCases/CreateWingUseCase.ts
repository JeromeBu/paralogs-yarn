import { Wing } from "@paralogs/shared";
import { WingRepo } from "../port/WingRepo";
import { notUnique } from "../core/errors";

export const createWingUseCaseCreator = (wingRepo: WingRepo) => {
  return async (wing: Wing) => {
    const existingWing = await wingRepo.findById(wing.id);
    if (existingWing) throw notUnique("Wing");
    await wingRepo.save(wing);
    return wing;
  };
};

export type CreateWingUseCase = ReturnType<typeof createWingUseCaseCreator>;
