import Amplify from "aws-amplify";

export const config = {
  s3: {
    REGION: "eu-west-1",
    BUCKET: "notes-app-jerome-s3",
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://v32oszvsol.execute-api.eu-west-1.amazonaws.com/dev/",
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_ZqVE8mJRm",
    APP_CLIENT_ID: "607eife8fgji37a50cul3q7gje",
    IDENTITY_POOL_ID: "eu-west-1:14e18c60-588b-4ea4-a117-71f8fe95e144",
  },
};

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "wings",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});
