import nodemailer from "nodemailer";

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
};

export const sendEmail = async (options: SendEmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `SGCCMS <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Email failed to send",
    };
  }
};
