import { app } from "./server";

const port = 4000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`--- Flights App is running on port: ${port} ---`));
