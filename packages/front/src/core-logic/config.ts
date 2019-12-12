import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const backendUrl = process.env.BACKEND_URL;

const throwMissingEnvVariable = (str: string) => {
  throw Error(`${str} env variable is missing`);
};

if (!backendUrl) throwMissingEnvVariable("BACKEND_URL");

export const config = {
  // s3: {
  //   REGION: "eu-west-1",
  //   BUCKET: "notes-app-jerome-s3",
  // },
  apiGateway: {
    REGION: "eu-west-1",
    // URL: "https://v32oszvsol.execute-api.eu-west-1.amazonaws.com/dev/",
    URL: backendUrl,
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_ZqVE8mJRm",
    APP_CLIENT_ID: "607eife8fgji37a50cul3q7gje",
    IDENTITY_POOL_ID: "eu-west-1:bb7c9241-2f1b-4fea-b58f-51baf566b6a3",
  },
};
