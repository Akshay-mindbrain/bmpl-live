// import rateLimit from "express-rate-limit";

// export const ratelimit = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       message: "Too many requests, please try again later.",
//     });
//   },
// });

// export const ratelimitlogin = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       message: "Too many login attempts. Please wait 15 minutes.",
//     });
//   },
// });
