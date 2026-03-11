import { IMailNotification } from "../interface";

export const send = async (mailNotification: IMailNotification) => {
  console.log(mailNotification.text);
};
