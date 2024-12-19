import amqp, { Connection, Channel, Message } from 'amqplib';

export class RMQService {
    static async connect(url: string): Promise<Connection> {
        try {
            const connection = await amqp.connect(url);
            console.log('Connected to RabbitMQ');
            return connection;
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    static async createChannel(connection: Connection): Promise<Channel> {
        try {
            const channel = await connection.createChannel();
            console.log('Channel created');
            return channel;
        } catch (error) {
            console.error('Error creating channel:', error);
            throw error;
        }
    }

    static sendMessage(channel: Channel, queue: string, message: string): void {
        try {
            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`Message sent to queue "${queue}": ${message}`);
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    static consumeMessage(
        channel: Channel,
        queue: string,
        callback: (message: string) => void
    ): void {
        try {
            channel.assertQueue(queue, { durable: true });
            console.log(`Waiting for messages in queue "${queue}"...`);

            channel.consume(queue, (msg: Message | null) => {
                if (msg) {
                    const messageContent = msg.content.toString();
                    console.log(`Received message: ${messageContent}`);
                    callback(messageContent);
                } else {
                    console.warn('Received null message');
                }
            }, { noAck: true });
        } catch (error) {
            console.error('Error consuming message:', error);
            throw error;
        }
    }
}
