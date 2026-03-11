import * as cron from "node-cron";

cron.schedule("*/5 * * * * *", () => {
  console.log("Hello Abinash");
});
