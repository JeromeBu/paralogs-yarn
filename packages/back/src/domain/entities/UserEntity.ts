import {
  Result,
  SignUpParams,
  UpdatePilotDTO,
  UserUuid,
  WithUuid,
} from "@paralogs/shared";
import { Email } from "../valueObjects/user/Email";
import { Password } from "../valueObjects/user/Password";
import { PersonName } from "../valueObjects/user/PersonName";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { Entity } from "../core/Entity";

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
  ): Promise<Result<UserEntity>> {
    return Result.combine({
      email: Email.create(params.email),
      password: Password.create(params.password),
      firstName: PersonName.create(params.firstName),
      lastName: PersonName.create(params.lastName),
    }).mapAsync(async ({ password, ...validResults }) => {
      const hashedPassword = await hashAndTokenManager.hash(password);
      return new UserEntity({
        uuid: params.uuid,
        ...validResults,
        // isEmailConfirmed: false,
        authToken: hashAndTokenManager.generateToken({ userUuid: params.uuid }),
        hashedPassword,
      });
    });
  }

  update(params: UpdatePilotDTO) {
    return Result.combine({
      ...(params.firstName ? { firstName: PersonName.create(params.firstName) } : {}),
      ...(params.lastName ? { lastName: PersonName.create(params.lastName) } : {}),
    }).map(validParamsToUpdate => {
      const userEntity = new UserEntity({ ...this.props, ...validParamsToUpdate });
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
