import nodemailer from "nodemailer";
import config from "@/config";
import * as mailtrapMailer from "@/services/mailer/mailtrap-mailer/MailtrapMailer";
import { IMailNotification } from "@/services/mailer/interface";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue("Email sent successfully"),
  })),
}));

describe("MailtrapMailer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should send an email with correct parameters", async () => {
    const mailNotification: IMailNotification = {
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test email content",
      html: "<p>Test email content</p>",
    };

    await mailtrapMailer.send(mailNotification);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    });

    const mockedCreateTransport = nodemailer.createTransport as jest.Mock;
    const sendMail = mockedCreateTransport.mock.results[0].value
      .sendMail as jest.Mock;

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith({
      from: '"Task Manager" <notifications@taskmanager.com>',
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test email content",
      html: "<p>Test email content</p>",
    });
  });
});
