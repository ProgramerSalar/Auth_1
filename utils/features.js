import DatauriParser from "datauri/parser.js";
import path from "path";
import {createTransport} from "nodemailer"


export const getDataUri = (file) => {
    
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);

};



export const sendEmail = async (subject, to, text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    to,
    subject,
    text,
  });
};