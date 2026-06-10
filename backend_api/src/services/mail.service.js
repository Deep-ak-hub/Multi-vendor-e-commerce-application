/* const nodemailer = require("nodemailer");
const { SmtpConfig } = require("../config/config");

class EmailService {
  #transport;

  constructor() {
    try {
      // console.log(SmtpConfig)
      this.#transport = nodemailer.createTransport({
        host: SmtpConfig.smtpHost,
        port: SmtpConfig.smtpPort,
        service: SmtpConfig.smtpService,
        auth: {
          user: SmtpConfig.smtpUser,
          pass: SmtpConfig.smtpPassword,
        },
      });
      console.log("SMTP SRVER CONNECTED SUCCESSFULLY");
    } catch (exception) {
      // console.log(exception);
      throw {
        code: 500,
        message: "SMTP not connected.........",
        status: "SMTP_CONNECTION_ERR",
      };
    }
  }

  async sendEmail({to, subject, message, cc = null, bcc = null, attachment = null}) {
    try {
      let messageBody = {
        to: to,
        from: SmtpConfig.smtpFromAddress,
        subject: subject,
        html: message,

        // text: "",
        // cc: "",
        // bcc: "",
        // attachments: "",
      };

      if(cc) {
        messageBody['cc'] = cc
      }
      
      if(bcc) {
        messageBody['bcc'] = bcc
      }

      if(attachment) {
        messageBody['attachment'] = attachment
      }

      return await this.#transport.sendMail(messageBody);
    } catch (exception) {
      throw {
        code: 500,
        message: "Email not sent",
        status: "SMTP_EMAIL_NOT_SEND_ERR",
      };
    }
  }
} */

const { Resend } = require("resend");
const { ResendConfig } = require("../config/config");

class EmailService {
  #transport;

  constructor() {
    try {
      this.#transport = new Resend(ResendConfig.resendApiKey);
    } catch (exception) {
      throw {
        code: 500,
        message: "Resend not connected....",
        status: "RESEND_CONNECTION_ERROR",
      };
    }
  }

  async sendEmail({
    to,
    subject,
    message,
    cc = null,
    bcc = null,
    attachment = null,
  }) {
    try {
      let messageBody = {
        from: ResendConfig.resendFROM,
        to: to,
        subject: subject,
        html: message,
      };

      if (cc) {
        messageBody["cc"] = cc;
      }
      if (bcc) {
        messageBody["bcc"] = bcc;
      }
      if (attachment) {
        messageBody["attachments"] = attachment;
      }

      return await this.#transport.emails.send(messageBody);
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "Email not sent",
        status: "RESEND_EMAIL_NOT_SENT_ERROR",
      };
    }
  }
}

module.exports = EmailService;
