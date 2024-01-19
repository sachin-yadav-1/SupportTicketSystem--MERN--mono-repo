const mongoConfig = {
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.DB_PROD
      : process.env.DB_LOCAL,
};

export default mongoConfig;
