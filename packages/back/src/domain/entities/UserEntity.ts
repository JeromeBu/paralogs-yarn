import { SignUpParams, WithId } from "@paralogs/shared";
import { Email } from "../valueObjects/user/Email";
import { UserId } from "../valueObjects/user/UserId";
import { Password } from "../valueObjects/user/Password";
import { PersonName } from "../valueObjects/user/PersonName";
import { Result } from "../core/Result";

interface UserEntityProps {
  id: UserId;
  email: Email;
  password: Password;
  firstName: PersonName;
  lastName?: PersonName;
  isEmailConfirmed: boolean;
  hashedPassword: string;
}

export class UserEntity {
  get id() {
    return this.props.id;
  }

  public getProps() {
    return this.props;
  }

  private constructor(private props: UserEntityProps) {}

  static create(params: SignUpParams & WithId): Result<UserEntity> {
    return Result.combine(
      {
        id: UserId.create(params.id),
        email: Email.create(params.email),
        password: Password.create(params.password),
        firstName: PersonName.create(params.firstName),
        lastName: PersonName.create(params.lastName),
      },
      resultsParams => {
        return new UserEntity({
          ...resultsParams,
          isEmailConfirmed: false,
          hashedPassword: "",
        });
      },
    );
  }
}
