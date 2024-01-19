import { connect } from "mongoose";
import app from "./src/app.js";
import mongoConfig from "./src/config/db.config.js";

process.on("unhandledException", (err) => {
  console.log("UNHANDLED EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

connect(mongoConfig.uri)
  .then(() => console.log("DB connection successful: ", mongoConfig.uri))
  .catch((err) => console.log("DB connection failed: ", err.message));

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
