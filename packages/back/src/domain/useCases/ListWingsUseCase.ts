import { Wing, UserId } from "@paralogs/shared";
import { WingRepo } from "../port/WingRepo";

export class ListWingsUseCase {
  private wingRepo: WingRepo;

  constructor(wingRepo: WingRepo) {
    this.wingRepo = wingRepo;
  }

  public async execute(userId: UserId): Promise<Wing[]> {
    return this.wingRepo.findByUserId(userId);
  }
}
