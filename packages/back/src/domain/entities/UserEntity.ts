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
    const email = Email.create(params.email);
    const userId = UserId.create(params.id);
    const firstName = PersonName.create(params.firstName);
    const lastName = PersonName.create(params.lastName);
    const password = Password.create(params.password);

    const propsResult = Result.combine([userId, email, firstName, lastName, password]);
    if (propsResult.error) return Result.fail(propsResult.error);

    return Result.ok(
      new UserEntity({
        id: userId.getValueOrThrow(),
        email: email.getValueOrThrow(),
        firstName: firstName.getValueOrThrow(),
        lastName: lastName.getValueOrThrow(),
        password: password.getValueOrThrow(),
      }),
    );
  }
}
