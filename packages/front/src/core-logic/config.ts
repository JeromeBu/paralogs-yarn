import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const environement = process.env.REACT_APP_ENVIRONEMENT;

const buildConfig = () => {
  switch (environement) {
    case "production":
      return {
        apiGateway: {
          REGION: "eu-west-1",
          // URL: "https://v32oszvsol.execute-api.eu-west-1.amazonaws.com/dev/",
          URL: "https://s8splmzrh5.execute-api.eu-west-1.amazonaws.com/production/",
        },
        cognito: {
          REGION: "eu-west-1",
          USER_POOL_ID: "eu-west-1_gaLCbuUav",
          APP_CLIENT_ID: "1oeikg8j7str872iu7orln2pbo",
          IDENTITY_POOL_ID: "eu-west-1:48df0aef-187c-45f3-bb91-7222636f0f58",
        },
      };
    case "staging":
      return {
        apiGateway: {
          REGION: "eu-west-1",
          // URL: "https://v32oszvsol.execute-api.eu-west-1.amazonaws.com/dev/",
          URL: "https://r3su0zwym6.execute-api.eu-west-1.amazonaws.com/staging/",
        },
        cognito: {
          REGION: "eu-west-1",
          USER_POOL_ID: "eu-west-1_jLXtsy4bc",
          APP_CLIENT_ID: "29s5uo8ksj8d0pphqiuqi5tlch",
          IDENTITY_POOL_ID: "eu-west-1:813768d7-09ee-45f6-8728-1fe302599f02",
        },
      };
    default:
      return {
        // s3: {
        //   REGION: "eu-west-1",
        //   BUCKET: "",
        // },
        apiGateway: {
          REGION: "eu-west-1",
          // URL: "https://v32oszvsol.execute-api.eu-west-1.amazonaws.com/dev/",
          URL: "http://localhost:4000/",
        },
        cognito: {
          REGION: "eu-west-1",
          USER_POOL_ID: "eu-west-1_ZqVE8mJRm",
          APP_CLIENT_ID: "607eife8fgji37a50cul3q7gje",
          IDENTITY_POOL_ID: "eu-west-1:bb7c9241-2f1b-4fea-b58f-51baf566b6a3",
        },
      };
  }
};

export const config = buildConfig();
