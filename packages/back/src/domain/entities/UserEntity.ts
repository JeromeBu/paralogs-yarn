import { SignUpParams, WithId } from "@paralogs/shared";
import { Email } from "../valueObjects/user/Email";
import { UserId } from "../valueObjects/user/UserId";
import { Password } from "../valueObjects/user/Password";
import { PersonName } from "../valueObjects/user/PersonName";
import { Result } from "../core/Result";
import { HashAndTokenManager } from "../port/HashAndTokenManager";

interface UserEntityProps {
  id: UserId;
  email: Email;
  firstName: PersonName;
  lastName?: PersonName;
  // isEmailConfirmed: boolean;
  hashedPassword: string;
  authToken: string;
  password?: never; // this field is forbidden
}

interface CreateUserDependencies {
  hashAndTokenManager: HashAndTokenManager;
}

export class UserEntity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  private constructor(private props: UserEntityProps) {}

  static create(
    params: SignUpParams & WithId,
    { hashAndTokenManager }: CreateUserDependencies,
  ): Promise<Result<UserEntity>> {
    return Result.combine({
      id: UserId.create(params.id),
      email: Email.create(params.email),
      password: Password.create(params.password),
      firstName: PersonName.create(params.firstName),
      lastName: PersonName.create(params.lastName),
    }).mapAsync(async ({ password, ...validResults }) => {
      const hashedPassword = await hashAndTokenManager.hash(password);
      return new UserEntity({
        ...validResults,
        // isEmailConfirmed: false,
        authToken: hashAndTokenManager.generateToken({ userId: validResults.id.value }),
        hashedPassword,
      });
    });
  }
}
