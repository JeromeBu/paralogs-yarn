import {
  SignUpParams,
  WithUserId,
  UserId,
  Result,
  UpdatePilotDTO,
} from "@paralogs/shared";
import { Email } from "../valueObjects/user/Email";
import { Password } from "../valueObjects/user/Password";
import { PersonName } from "../valueObjects/user/PersonName";
import { HashAndTokenManager } from "../gateways/HashAndTokenManager";
import { Entity } from "../core/Entity";

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

export type UserPersistence = {
  id: UserId;
  email: string;
  first_name: string;
  last_name?: string;
  hashed_password: string;
  auth_token: string;
};

// Question : comment assurer qu'on a bien toutes les clés dans necessaire dans UserPg au niveau du typage ?
// les clés doivent matcher les key de UserEntityProps dans UserEntity

export class UserEntity extends Entity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  update(params: UpdatePilotDTO) {
    return Result.combine({
      ...(params.firstName ? { firstName: PersonName.create(params.firstName) } : {}),
      ...(params.lastName ? { lastName: PersonName.create(params.lastName) } : {}),
    }).map(validParamsToUpdate => {
      return new UserEntity({ ...this.props, ...validParamsToUpdate });
    });
  }

  static createFromPersistence(params: UserPersistence): UserEntity {
    return Result.combine({
      email: Email.create(params.email),
      firstName: PersonName.create(params.first_name),
      lastName: PersonName.create(params.last_name),
    })
      .map(
        validResults =>
          new UserEntity({
            ...validResults,
            id: params.id,
            authToken: params.auth_token,
            hashedPassword: params.hashed_password,
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

  private constructor(private props: UserEntityProps) {
    super();
  }
}

export interface WithCurrentUser {
  currentUser: UserEntity;
}
