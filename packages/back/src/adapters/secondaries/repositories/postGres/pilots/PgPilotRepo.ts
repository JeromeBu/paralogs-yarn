import { PilotUuid } from "@paralogs/shared";
import Knex from "knex";
import { liftMaybe, liftPromise as liftPromiseToMaybeAsync } from "purify-ts/MaybeAsync";
import { Maybe } from "purify-ts";
import { liftPromise as liftPromiseToEitherAsync } from "purify-ts/EitherAsync";
import { LeftAsync, ResultAsync, RightAsyncVoid } from "@paralogs/back-shared";

import { PilotEntity } from "../../../../../domain/entities/PilotEntity";
import { pilotPersistenceMapper } from "./pilotPersistenceMapper";
import { PilotRepo } from "../../../../../domain/gateways/PilotRepo";
import { PilotPersistence } from "./PilotPersistence";
import { knexError } from "../knex/knexErrors";

export class PgPilotRepo implements PilotRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public save(pilotEntity: PilotEntity) {
    return pilotEntity.hasIdentity()
      ? this._update(pilotEntity)
      : this._create(pilotEntity);
  }

  public findByUuid(uuid: PilotUuid) {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<PilotPersistence>("pilots")
        .where({ uuid })
        .first(),
    )
      .chain(pilotPersistence => liftMaybe(Maybe.fromNullable(pilotPersistence)))
      .map(pilotPersistenceMapper.toEntity);
  }

  private _create(pilotEntity: PilotEntity): ResultAsync<void> {
    const pilotPersistence = pilotPersistenceMapper.toPersistence(pilotEntity);
    return liftPromiseToEitherAsync(() => this.knex("pilots").insert(pilotPersistence))
      .chainLeft((error: any) => {
        const isEmailTaken: boolean =
          error.detail?.includes("already exists") && error.detail?.includes("email");
        return LeftAsync(
          knexError(
            isEmailTaken ? "Email is already taken. Consider logging in." : error.message,
          ),
        );
      })
      .chain(RightAsyncVoid);
  }

  private _update(pilotEntity: PilotEntity): ResultAsync<void> {
    const { firstName, lastName } = pilotEntity.getProps();
    return liftPromiseToEitherAsync(() =>
      this.knex
        .from<PilotPersistence>("pilots")
        .where({ uuid: pilotEntity.uuid })
        .update({
          first_name: firstName.value,
          ...(lastName
            ? {
                last_name: lastName?.value,
              }
            : {}),
        }),
    )
      .chain(RightAsyncVoid)
      .chainLeft(error => {
        // eslint-disable-next-line no-console
        console.error("Fail to update pilot :", error);
        return LeftAsync(knexError("Fail to update pilot"));
      });
  }
}
