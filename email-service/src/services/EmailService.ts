import nodemailer from 'nodemailer';
import { channel } from '../index';

export class EmailService {

    private handleMessage = async (msg: any) => {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            if (message.type === 'USER_CREATED') {
                try {
                    await this.sendEmail(message.user);
                    channel?.ack(msg); 
                } catch (error: any) {
                    console.error(`Error processing message: ${error.message}`);
                    channel?.nack(msg, false, true);
                }
            }
        }
    };

    private async sendEmail(user: any) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Welcome to Our Service!',
            text: `Hello ${user.name},\n\nThank you for registering! We're excited to have you on board.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email sending failed');
        }
    }

    public async start() {
        try {
            if (channel) {
                channel.consume('user_queue', this.handleMessage);
                console.log('Listening for messages in user_queue...');
            }
        } catch (error) {
            console.error('Error starting email service:', error);
        }
    }
}
