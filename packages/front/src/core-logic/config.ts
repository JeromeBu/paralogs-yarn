import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const environement = process.env.REACT_APP_ENVIRONEMENT;

// eslint-disable-next-line no-console
console.log({
  REACT_APP_ENVIRONEMENT: process.env.REACT_APP_ENVIRONEMENT,
});

const backendUrl = (() => {
  switch (environement) {
    case "production":
      return "https://s8splmzrh5.execute-api.eu-west-1.amazonaws.com/production/";
    case "staging":
      return "https://r3su0zwym6.execute-api.eu-west-1.amazonaws.com/staging/";
    default:
      return "http://localhost:4000/";
  }
})();

const throwMissingEnvVariable = (str: string) => {
  throw Error(`${str} env variable is missing`);
};

if (!backendUrl) throwMissingEnvVariable("REACT_APP_BACKEND_URL");

export const config = {
  // s3: {
  //   REGION: "eu-west-1",
  //   BUCKET: "",
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
