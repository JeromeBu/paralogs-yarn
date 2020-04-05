import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const environment = process.env.REACT_APP_ENVIRONEMENT;

const buildConfig = () => {
  switch (environment) {
    case "production":
      return {
        apiUrl: "https://s8splmzrh5.execute-api.eu-west-1.amazonaws.com/production/",
      };
    case "staging":
      return {
        apiUrl: "https://r3su0zwym6.execute-api.eu-west-1.amazonaws.com/staging/",
      };
    default:
      return {
        apiUrl: "http://localhost:4000/",
      };
  }
};

export const config = buildConfig();
