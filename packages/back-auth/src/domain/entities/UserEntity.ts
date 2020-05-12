import { SignUpParams, PilotUuid, WithUuid } from "@paralogs/shared";
import { liftEither, liftPromise } from "purify-ts/EitherAsync";
import { Entity, ResultAsync } from "@paralogs/back-shared";

import { Email } from "../valueObjects/user/Email";
import { Password } from "../valueObjects/user/Password";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";

interface UserEntityProps {
  uuid: PilotUuid;
  email: Email;
  // isEmailConfirmed: boolean;
  hashedPassword: string;
  authToken: string;
  password?: never; // this field is forbidden
}

interface UserDependencies {
  hashAndTokenManager: HashAndTokenManager;
}

export class UserEntity extends Entity<UserEntityProps> {
  get email() {
    return this.getProps().email;
  }

  static create(
    params: SignUpParams & WithUuid,
    { hashAndTokenManager }: UserDependencies,
  ): ResultAsync<UserEntity> {
    const eitherValidParams = Email.create(params.email).chain(email => {
      return Password.create(params.password).map(password => {
        return { email, password };
      });
    });

    return liftEither(eitherValidParams).chain(({ password, email }) =>
      liftPromise(async () => {
        const hashedPassword = await hashAndTokenManager.hash(password);
        return new UserEntity({
          uuid: params.uuid,
          email,
          // isEmailConfirmed: false,
          authToken: hashAndTokenManager.generateToken({ userUuid: params.uuid }),
          hashedPassword,
        });
      }),
    );
  }

  static fromDTO(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
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

  private constructor(props: UserEntityProps) {
    super(props);
  }
}

export interface WithCurrentUser {
  currentUser: UserEntity;
}
