const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'mailgun',
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
});

module.exports = {
    sendMail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({
                from, to, subject, html
            }, (err, info) => {
                if (err) {
                    reject(err);
                }
                resolve(info);
            })
        },)
    }
}