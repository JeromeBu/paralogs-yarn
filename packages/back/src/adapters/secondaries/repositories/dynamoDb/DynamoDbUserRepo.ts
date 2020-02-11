// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from "aws-sdk";
import { UserRepo } from "../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class DynamoDbUserRepo implements UserRepo {
  public async findByEmail(email: Email): Promise<UserEntity | undefined> {
    const params = {
      TableName: process.env.usersTable!,
      Key: {
        email: email.value,
      },
    };

    const result = await dynamoDb.get(params).promise();
    // eslint-disable-next-line no-console
    console.log({
      email,
      result,
      resultItem: result.Item,
    });

    return result.Item ? (result.Item as UserEntity) : undefined;
  }

  public async save(user: UserEntity) {
    const params = {
      TableName: process.env.usersTable!,
      Item: {
        email: user.getProps().email.value,
        content: user,
        createdAt: Date.now(),
      },
    };

    await dynamoDb.put(params).promise();
  }
}
