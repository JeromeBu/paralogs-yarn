import { noCurrentUser } from "../../domain/core/errors";
import { failure } from "../lib/response-lib";
import { makeUserEntityCreator } from "../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../secondaries/TestHashAndTokenManager";
import { listWingsController } from "./controllers/listWingscontroller";

const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());

export const main = async () => {
  const currentUser = await makeUserEntity();
  if (!currentUser) return failure(noCurrentUser());

  return listWingsController(currentUser);
};
