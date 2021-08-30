const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "emil.taciyev@gmail.com",
      pass: "QcMk49IzdU25Rf3A",
    },
  });
  
  async function mailer(subject,to, name) {
    try {
      const result = await transporter.sendMail({
        subject: subject,
        to: to,
        from: "emil.taciyev@gmail.com",
        html: `  
        
        <div style="display: flex;  padding: 10px; align-items: center; justify-content: center;">
        <div style="width: 100%; padding: 10px;">
            <p style="text-align:justify; font-size:20px; color: #3da3d4; font-weight: 800"> <b>Hi ${name}</b></p>
            <p style="text-align:justify;">Thanks for using Medical App!</p>
            <p style="text-align:justify;">This automatic reply is just to let you know that we find out error from your site.</p>
            <p style="text-align:justify;">
                If you have a general question about using Medical App, you’re welcome to browse our
                asked questions.
                If you have any additional information that you think will help us to assist you,
                please feel free to reply to this email.
            </p>
            <p style="text-align:justify;">We look forward to chatting soon!</p>
            <p style="text-align:justify;">Thanks.</p>
        </div>
  
  
      
    </div>
  
      `,
      });
  
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  module.exports = mailer;