export const userServiceSetup = {
  serviceName: "user",
  envFile: "../.env",
  portKey: "USER_PORT",
  fallbackPortKey: "PORT",
  defaultPort: 3001,
  accessTokenCookie: "userAccessToken",
  refreshTokenCookie: "userRefreshToken",
} as const;
