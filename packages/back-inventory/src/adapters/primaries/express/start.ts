import { app } from "./server";

const port = 4001;

// eslint-disable-next-line no-console
app.listen(port, () =>
  console.log(`--- Auth App is running on port: ${port} ---`),
);
