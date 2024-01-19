import app from "./app.js";

process.on("unhandledException", (err) => {
  console.log("UNHANDLED EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

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
