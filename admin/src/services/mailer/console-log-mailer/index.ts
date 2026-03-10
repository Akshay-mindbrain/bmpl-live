import * as consoleLogMailer from "./ConsoleLogMailer";
import { IMailer } from "../interface";

const mailer: IMailer = {
  send: consoleLogMailer.send,
};

export { mailer };
