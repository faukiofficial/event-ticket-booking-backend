const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

exports.otpEmailService = async (email, data) => {
    try {
        const html = fs.readFileSync("./view/email/otp.html", "utf-8");
        const template = Mustache.render(html, data);
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: `${data.otp} is your OTP for registration`,
            html: template,
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

exports.orderNotificationForParticipant = async (email, data) => {
    try {
        const html = fs.readFileSync("./view/email/orderNotificationForParticipant.html", "utf-8");
        const template = Mustache.render(html, data);
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "Order Confirmation",
            html: template,
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}