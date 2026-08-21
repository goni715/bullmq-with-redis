import nodemailer from "nodemailer";
import envConfig from "@/config/env";

const sendEmail = async (email: string) => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: envConfig.node_env === "production" ? 465 : 587,
    secure: envConfig.node_env === "production",
    auth: {
      user: envConfig.smtp.smtp_username,
      pass: envConfig.smtp.smtp_password,
    },
    tls: {
      rejectUnauthorized: envConfig.node_env === "production",
    },
  });

  const mailOptions = {
    from: `"BullMQ Redis App" ${envConfig.smtp.smtp_from}`,
    to: email,
    subject: "Welcome to BullMQ Redis App",
    // Plain-text fallback — critical for spam score
    text: `Welcome to BullMQ Redis App!\n\nWe are excited to have you on board.\n\n© ${new Date().getFullYear()} BullMQ Redis App`,
    html: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body style="margin:0; padding:0; background-color:#f0f4f8; font-family:Arial, Helvetica, sans-serif; color:#1a202c;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8; padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="540" cellpadding="0" cellspacing="0" border="0"
          style="background-color:#ffffff; border-radius:8px; border:1px solid #e2e8f0; overflow:hidden;">

          <!-- Top accent bar -->
          <tr>
            <td height="4" style="background-color:#2563eb; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:36px 40px 24px;">
              <p style="margin:0; font-size:20px; font-weight:bold; color:#1e40af; letter-spacing:0.5px;">BULLMQ REDIS APP</p>
              <p style="margin:6px 0 0; font-size:12px; color:#64748b; letter-spacing:1px; text-transform:uppercase;">Welcome!</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td height="1" style="background-color:#e2e8f0; font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">

              <p style="margin:0 0 12px; font-size:16px; font-weight:bold; color:#1a202c;">Hello,</p>
              <p style="margin:0 0 28px; font-size:14px; color:#4a5568; line-height:1.7;">
                Welcome to BullMQ Redis App! We are thrilled to have you here. 
                Explore our features and get started on your journey with us.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; border-top:1px solid #e2e8f0; padding:20px 40px; text-align:center;">
              <p style="margin:0 0 4px; font-size:12px; color:#64748b;">
                Questions? Contact us at
                <a href="mailto:support@example.com" style="color:#2563eb; text-decoration:none;">support@example.com</a>
              </p>
              <p style="margin:0; font-size:11px; color:#94a3b8;">
                &copy; ${new Date().getFullYear()} BullMQ Redis App. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendEmail;
