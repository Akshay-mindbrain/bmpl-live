import * as mailtrapMailer from "./MailtrapMailer";
import { IMailer } from "../interface";

const mailer: IMailer = {
  send: mailtrapMailer.send,
};

export { mailer };
