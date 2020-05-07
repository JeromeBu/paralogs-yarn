import { SignUpParams, UpdatePilotDTO, UserUuid, WithUuid } from "@paralogs/shared";
import { liftEither, liftPromise } from "purify-ts/EitherAsync";

import { Email } from "../valueObjects/user/Email";
import { Password } from "../valueObjects/user/Password";
import { PersonName } from "../valueObjects/user/PersonName";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { Entity } from "../core/Entity";
import { ResultAsync } from "../core/purifyAdds";
import { combineEithers } from "../core/EitherFunctions";

interface UserEntityProps {
  uuid: UserUuid;
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

export class UserEntity extends Entity<UserEntityProps> {
  static create(
    params: SignUpParams & WithUuid,
    { hashAndTokenManager }: UserDependencies,
  ): ResultAsync<UserEntity> {
    const eitherValidParams = Email.create(params.email).chain(email => {
      return Password.create(params.password).chain(password => {
        return PersonName.create(params.firstName).chain(firstName => {
          return PersonName.create(params.lastName).map(lastName => {
            return { email, password, firstName, lastName };
          });
        });
      });
    });

    return liftEither(eitherValidParams).chain(({ password, ...validParams }) =>
      liftPromise(async () => {
        const hashedPassword = await hashAndTokenManager.hash(password);
        return new UserEntity({
          uuid: params.uuid,
          ...validParams,
          // isEmailConfirmed: false,
          authToken: hashAndTokenManager.generateToken({ userUuid: params.uuid }),
          hashedPassword,
        });
      }),
    );
  }

  update(params: UpdatePilotDTO) {
    return combineEithers({
      ...(params.firstName ? { firstName: PersonName.create(params.firstName) } : {}),
      ...(params.lastName ? { lastName: PersonName.create(params.lastName) } : {}),
    }).map(validParams => {
      const userEntity = new UserEntity({ ...this.props, ...validParams });
      userEntity.setIdentity(this.getIdentity());
      return userEntity;
    });
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
