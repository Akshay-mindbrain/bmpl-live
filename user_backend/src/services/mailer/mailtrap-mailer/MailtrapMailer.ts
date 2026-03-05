import nodemailer from "nodemailer";
import { IMailNotification } from "../interface";
import config from "@/config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const options: SMTPTransport.Options = {
  host: config.mail.host,
  port: config.mail.port,
  auth: {
    user: config.mail.username,
    pass: config.mail.password,
  },
};

const transporter = nodemailer.createTransport(options);

export const send = async (mailNotification: IMailNotification) => {
  await transporter.sendMail({
    from: '"Task Manager" <notifications@taskmanager.com>',
    to: mailNotification.to,
    subject: mailNotification.subject,
    text: mailNotification.text,
    html: mailNotification.html,
  });
};
