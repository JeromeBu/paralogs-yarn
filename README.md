# Paralogs

This project is a log book for paragliders pilotes.
Pilotes are able to log there the wings that they own, and all the flight that they do.

## Start-up

- Clone the project
- At the root level of the project :

1.  run `yarn install`
2.  run `docker-compose -f docker-compose.pg.yml up` to start up the PG database correctly set up.
3.  run `yarn start:dev`

## Structure

The project is build as a monorepo using yarn workspaces. So yarn is necessary to start it.

The packages are :

- back
- front-core
- front-web
- shared

`shared` is used in all other packages.
This is where the DTO are defined, it allows to have a consistent interface contract.
Some utility functions are also shared here.

`front-core` is used only in `front-web`, it is build only with redux and typescript and should never depend on a framework.
The logic has to be there as much as possible.

`front-web` this is the React project. It focuses on UI only.
All the state management must be imported from `front-core`.

`back` holds all the backend.

When running `yarn start:dev` :

- `shared` is build and watched with `tsc`
- `front-core` is build and watched `tsc`
- `back` is run on port 4000, and watched (but not built with tsc), with PG database by default
- `front-web` is run on port 3000

To use InMemory repos instead of PG run : `REPOSITORIES=IN_MEMORY yarn start:dev`

`yarn test:watch` can be used to run and watch all the unit tests (back and front-core)
