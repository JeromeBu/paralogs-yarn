import { SignUpParams, WithUserId, UserId } from "@paralogs/shared";
import { Email } from "../valueObjects/user/Email";
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

interface UserDependencies {
  hashAndTokenManager: HashAndTokenManager;
}

type FromPersistenceParams = WithUserId &
  Omit<SignUpParams, "password"> & {
    hashedPassword: string;
    authToken: string;
  };

export class UserEntity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  static createFromPersistence(params: FromPersistenceParams): UserEntity {
    return Result.combine({
      email: Email.create(params.email),
      firstName: PersonName.create(params.firstName),
      lastName: PersonName.create(params.lastName),
    })
      .map(
        validResults =>
          new UserEntity({
            ...validResults,
            id: params.id,
            authToken: params.authToken,
            hashedPassword: params.authToken,
          }),
      )
      .getOrThrow();
  }

  static create(
    params: SignUpParams & WithUserId,
    { hashAndTokenManager }: UserDependencies,
  ): Promise<Result<UserEntity>> {
    return Result.combine({
      email: Email.create(params.email),
      password: Password.create(params.password),
      firstName: PersonName.create(params.firstName),
      lastName: PersonName.create(params.lastName),
    }).mapAsync(async ({ password, ...validResults }) => {
      const hashedPassword = await hashAndTokenManager.hash(password);
      return new UserEntity({
        id: params.id,
        ...validResults,
        // isEmailConfirmed: false,
        authToken: hashAndTokenManager.generateToken({ userId: params.id }),
        hashedPassword,
      });
    });
  }

  public checkPassword(
    candidatePassword: string,
    { hashAndTokenManager }: UserDependencies,
  ): Promise<boolean> {
    return hashAndTokenManager.compareHashes(
      candidatePassword,
      this.props.hashedPassword,
    );
  }

  private constructor(private props: UserEntityProps) {}
}
