import { ValueOf } from "@paralogs/shared";
import { authActions } from "../useCases/auth/auth.slice";
import { wingActions } from "../useCases/wings/wings.slice";
import { flightActions } from "../useCases/flights/flights.slice";

const rootAction = {
  currentUser: authActions,
  flight: flightActions,
  wing: wingActions,
};

export type RootAction = ValueOf<typeof rootAction>;
