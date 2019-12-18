import { WingRepo } from "../port/WingRepo";
import { UserId } from "../valueObjects/UserId";
import { WingEntity } from "../entities/WingEntity";
import { Result } from "../core/Result";

export class ListWingsUseCase {
  private wingRepo: WingRepo;

  constructor(wingRepo: WingRepo) {
    this.wingRepo = wingRepo;
  }

  public async execute(userId: string): Promise<Result<WingEntity[]>> {
    const userIdOrError = UserId.create(userId);
    if (userIdOrError.error) return Result.fail(userIdOrError.error);
    return Result.ok(await this.wingRepo.findByUserId(userIdOrError.getValueOrThrow()));
  }
}
