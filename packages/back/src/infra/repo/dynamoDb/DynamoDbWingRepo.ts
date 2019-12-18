// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from "aws-sdk";
import { WingRepo } from "../../../domain/port/WingRepo";
import { WingEntity } from "../../../domain/entities/WingEntity";
import { UserId } from "../../../domain/valueObjects/UserId";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class DynamoDbWingRepo implements WingRepo {
  public async findById() {
    return undefined;
  }

  public async findByUserId(userId: UserId) {
    const params = {
      TableName: process.env.wingsTable!,
      // 'KeyConditionExpression' defines the condition for the query
      // - 'userId = :userId': only return items with matching 'userId'
      //   partition key
      // 'ExpressionAttributeValues' defines the value in the condition
      // - ':userId': defines 'userId' to be Identity Pool identity id
      //   of the authenticated user
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId.value,
      },
    };
    const result = await dynamoDb.query(params).promise();
    // eslint-disable-next-line no-console
    console.log("results Items : ", result.Items);
    return result.Items ? result.Items.map(({ content }) => content) : [];
  }

  public async save(wing: WingEntity) {
    const params = {
      TableName: process.env.wingsTable!,
      // 'Item' contains the attributes of the item to be created
      // - 'userId': user identities are federated through the
      //             Cognito Identity Pool, we will use the identity id
      //             as the user id of the authenticated user
      // - 'noteId': a unique uuid
      // - 'content': parsed from request body
      // - 'attachment': parsed from request body
      // - 'createdAt': current Unix timestamp
      Item: {
        userId: wing.userId.value,
        wingId: wing.id.value,
        content: wing,
        createdAt: Date.now(),
      },
    };

    await dynamoDb.put(params).promise();
  }
}
