import { getApp } from "./server";

const port = 4000;

getApp()
  .then((app) =>
    app.listen(port, () =>
      // eslint-disable-next-line no-console
      console.log(`--- Flights App is running on port: ${port} ---`),
    ),
  )
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log("--- An error occured --- \n", e);
  });
