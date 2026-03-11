export const adminServiceSetup = {
  serviceName: "admin",
  envFile: "../.env",
  portKey: "ADMIN_PORT",
  fallbackPortKey: "PORT",
  defaultPort: 3000,
  accessTokenCookie: "accessToken",
  refreshTokenCookie: "refreshToken",
} as const;
