import nodemailer from "nodemailer";
import { Users, UsersModel } from "../../component/Users/model";

const MAIL_CONFIG = {
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const sendOTPVerificationEmail = async (email: string, otp: string) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      ...MAIL_CONFIG,
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "OTP Verification",
      html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Email Confirmation</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
@media screen {
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
  }
}
body,
table,
td,
a {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
table,
td {
  mso-table-rspace: 0pt;
  mso-table-lspace: 0pt;
}
img {
  -ms-interpolation-mode: bicubic;
}
a[x-apple-data-detectors] {
  font-family: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
  text-decoration: none !important;
}
div[style*="margin: 16px 0;"] {
  margin: 0 !important;
}
body {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
table {
  border-collapse: collapse !important;
}
a {
  color: #1a82e2;
}
img {
  height: auto;
  line-height: 100%;
  text-decoration: none;
  border: 0;
  outline: none;
}
</style>
</head>
<body style="background-color: #e9ecef;">
<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
  Greetings, Champ. I'm glad you've embarked on this adventure to redefine your organizational flow today.
</div>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="center" valign="top" style="padding: 36px 24px;">
            <a href="#" target="_blank" style="display: inline-block;">
              <img src="./decagon.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#e9ecef">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            <p style="margin: 0;">Use the OTP code below to confirm your email address. If you didn't create an account with <a href="#">Decagon EMS</a>, you can safely delete this email.</p>
          </td>
        </tr>
        <tr>
          <td align="left" bgcolor="#ffffff">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center";">
                     
                      <h1 style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 32px; color: #black; ">${otp}</h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
            <p style="margin: 0;">Cheers, Decagon Team EMS</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p style="margin: 0;">You received this email because we received a request for email verification for your account. If you didn't request verification you can safely delete this email.</p>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p style="margin: 0;">To stop receiving these emails, you can <a href="#" target="_blank">unsubscribe</a> at any time.</p>
            <p style="margin: 0;">Edo Tech Park, Benin City, Edo state</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`,
    };

    let info = await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const sendResetOTP = async (email: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      ...MAIL_CONFIG,
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset Password OTP",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .content h2 {
            margin: 0;
            color: #333;
        }
        .content p {
            margin: 20px 0;
            color: #777;
        }
        .btn {
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
        }
        .footer {
            margin-top: 20px;
            padding: 10px;
            background-color: #f4f4f4;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <h2>Hello,</h2>
            <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
            <p>To reset your password, use the one-time-password  (OTP) below:</p>
            <h1 style=" font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 32px; color: #black;">${otp}</h1>
            <p> This code expires in 5 minutes</p>
        </div>
        <div class="footer" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p>If you have any questions, please contact our support team.</p>
                      <p>To stop receiving these emails, you can <a href="#" target="_blank">unsubscribe</a> at any time.</p>
            <p>Edo Tech Park, Benin City, Edo state</p>
        </div>
    </div>
  


 
</body>
</html>
`,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log(`${info.messageId}`);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export default sendOTPVerificationEmail;

export default sendOTPVerificationEmail;
