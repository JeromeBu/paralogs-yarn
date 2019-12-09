import { Wing } from "@paralogs/shared";
import { WingRepo } from "../port/WingRepo";
import { notUnique } from "../core/errors";

export class CreateWingUseCase {
  private wingRepo: WingRepo;

  constructor(wingRepo: WingRepo) {
    this.wingRepo = wingRepo;
  }

  public async execute(wing: Wing) {
    const existingWing = await this.wingRepo.findById(wing.id);
    if (existingWing) throw notUnique("Wing");
    await this.wingRepo.save(wing);
    return wing;
  }
}
