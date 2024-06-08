import nodemailer, { TransportOptions } from "nodemailer";

type sendMailOptionsObject = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendMail = async (options: sendMailOptionsObject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMPT_PORT || '465', 10), 
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  } as TransportOptions);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
