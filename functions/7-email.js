require('dotenv').config();
const client = require('@sendgrid/mail');

const {
    SENDGRID_EMAIL_API_KEY,
    SENDGRID_TO_EMAIL,
    SENDGRID_FROM_EMAIL
} = process.env

exports.handler = async (event, context) => {
    const method = event.httpMethod;
    if (method !== "POST") {
        return {
            statusCode: 405,
            body: "Only POST Request Allowed"
        }
    }

    const { name, email, subject, message } = JSON.parse(event.body);
    client.setApiKey(SENDGRID_EMAIL_API_KEY);

    if (!name || !email || !subject || !message) {
        return {
            statusCode: 400,
            body: 'Please provide all values!'
        }
    }
    const data = {
        to: SENDGRID_TO_EMAIL,
        from: SENDGRID_FROM_EMAIL,
        subject: `${subject}`,
        html: `
            <h3 style="font-size: 28px;">Hi, My name is ${name}</h3>
            <p style="font-size: 16px;">New message!! Email address is: <strong>${email}</strong>, <br /> the message is::: ${message}</p>
        `
    }

    try {
        await client.send(data);
        return {
            statusCode: 200,
            body: 'Success'
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.message),
        }
    }
}