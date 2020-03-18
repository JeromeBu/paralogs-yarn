module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.integration.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
