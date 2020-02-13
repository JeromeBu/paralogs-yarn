import { Epic } from "redux-observable";
import { RootState, Dependencies } from "../../../reduxStore";
import { AuthAction } from "../auth.actions";

export const logoutEpic: Epic<AuthAction, AuthAction, RootState, Dependencies> = (
  action$,
  // state$,
  // { clientStorage },
) => action$;
// .pipe
// filter(isActionOf(authActions.logout)),
// switchMap(a => {
//   return clientStorage.remove("token").pipe(
//     map(authActions.logoutSuccess),
//     catchError(err => of(authActions.loginError(err))),
//   );
// }),
// ();
