const parsePort = (...values: Array<string | undefined>) => {
  for (const value of values) {
    const port = Number.parseInt(value ?? "", 10);
    if (Number.isFinite(port) && port > 0) {
      return port;
    }
  }

  return 3001;
};

const config = {
  env: process.env.NODE_ENV || "development",
  port: parsePort(process.env.USER_PORT, process.env.PORT),
  debug: process.env.APP_DEBUG === "true",
  logLevel: process.env.LOG_LEVEL || "info",
  consoleLogEmails: process.env.CONSOLE_LOG_EMAILS === "true",
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE || "5"),
  appSecret: process.env.APP_SECRET || "",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "access-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
  jwtAccessExpires: process.env.ACCESS_TOKEN_TTL || "15m",
  jwtRefreshExpires: process.env.REFRESH_TOKEN_TTL || "7d",
  issuerBaseUrl: process.env.ISSUER_BASE_URL || "https://ussuer.com",
  audience: process.env.AUDIENCE || "default-audience",
  mail: {
    mailer: process.env.MAIL_MAILER || "smtp",
    host: process.env.MAIL_HOST || "",
    port: Number(process.env.MAIL_PORT) || 0,
    username: process.env.MAIL_USERNAME || "",
    password: process.env.MAIL_PASSWORD || "",
  },
  adminEmail: process.env.ADMIN_EMAIL || "",
  corsOrigin: process.env.USER_CORS_ORIGIN || "http://localhost:5173",
};
// console.log(process.env.DATABASE_URL);

export default config;
