let nodemailer = require('nodemailer');

module.exports = {
  registerMail: (mail, username, link) => {
    let message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>안녕하세요 ` +
      username +
      `님,</p>
        <p>FUN & BUN에서 보낸 회원가입 인증 메일입니다.</p>
        <br>
        <p><a href="` +
      link +
      `">Click here</a></p>
      </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: 'kdw971203',
        pass: 'rla@360700!',
      },
    });
    transporter.sendMail(
      {
        from: 'kdw971203@naver.com',
        to: mail,
        subject: 'Welcome to FUN & BUN',
        html: message,
        contentType: 'text/html',
      },
      (err, info) => {
        console.log(info);
      }
    );
  },

  forgotPasswordMail: (mail, username, link) => {
    var message =
      `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ` +
      username +
      `,</p>
        <br>
        <p>We have received your password reset request on Matcha.</p>
        <p>Don't worry we got you covered ;)</p>
        <p>To reset your password on Matcha, please visit the following link: <a href="` +
      link +
      `">Click here</a></p>
        <br>
        <p>See you soon on Matcha.</p>
      </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
    });
    transporter.sendMail(
      {
        from: 'noreply@matcha.com',
        to: mail,
        subject: 'Matcha - Reset password',
        html: message,
        contentType: 'text/html',
      },
      (err, info) => {
        console.log(info.envelope);
      }
    );
  },
};
