import { app } from "./server";

const port = 4000;

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`--- Flights App is running on port: ${port} ---`),
);
