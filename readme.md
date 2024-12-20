# RABBIT MQ
RabbitMQ is open source message broker software (sometimes called message-oriented middleware) that implements the Advanced Message Queuing Protocol (AMQP).

### RabbitMQ has its own set of terminology that is important to understand when working with the message broker. Here are the most commonly used terms:
- **PRODUCER** : An application or process that sends messages to RabbitMQ.
- **CONSUMER** : An application or process that receives messages from RabbitMQ.
- **QUEUE** : A buffer that stores messages. Queues are where messages are sent by producers and from where they are received by consumers.
- **ACKNOWLEDGE (ACK)** : A signal sent by a consumer to RabbitMQ to indicate that a message has been successfully processed.
- **EXCHANGE**: An entity that routes messages to one or more queues based on routing rules. Exchanges do not store messages; they simply route them.
- **[WORK QUEUE](https://www.rabbitmq.com/tutorials/tutorial-two-javascript)**: The main idea behind Work Queues (aka: Task Queues) is to avoid doing a resource-intensive task immediately and having to wait for it to complete. Instead we schedule the task to be done later.
- **[MESSAGE DURABILITY](https://www.rabbitmq.com/tutorials/tutorial-two-javascript#message-durability)**
- **[MESSAGE ACKNOWLEDGMENT](https://www.rabbitmq.com/tutorials/tutorial-two-javascript#message-acknowledgment)**
- **[FAIR DISPATCH](https://www.rabbitmq.com/tutorials/tutorial-two-javascript#fair-dispatch)**
- **[PUBLISH/SUBSCRIBE](https://www.rabbitmq.com/tutorials/tutorial-three-javascript#publishsubscribe)**
- **[EXCHANGES](https://www.rabbitmq.com/tutorials/tutorial-three-javascript#exchanges)** : The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue. Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.
- **[TEMPORARY QUEUE](https://www.rabbitmq.com/tutorials/tutorial-three-javascript#temporary-queues)**
- **[BINDINGS](https://www.rabbitmq.com/tutorials/tutorial-three-javascript#bindings)**
- **[PUTTING IT ALL TOGETHER](https://www.rabbitmq.com/tutorials/tutorial-three-javascript#putting-it-all-together)**
- **[ROUTING & STUFF! READ ALL IMP!](https://www.rabbitmq.com/tutorials/tutorial-four-javascript)**

# PROJECT SETUP INSTRUCTIONS

# Installation
1. Clone the repository
```
git clone https://github.com/amit-singh-mobcoder/microservice.git microservice
```

2. `cd microservice`
then open terminal and run the following cmd
```
docker compose up -d
```

3. cd user-service
```
npm install
```

4. cd email-service
```
npm install
```

# Configuration
Create ```.env``` file inside ```email-service``` directory
```javascript
PORT=3002
MONGODB_URL='mongodb://localhost:27017'

RABBITMQ_URL='amqp://localhost:5672'

# Gmail
EMAIL_USER='your-email-address'
EMAIL_PASS='secret code'

```
Create ```.env``` file inside ```user-service``` directory
```javascript
PORT=3001
MONGODB_URL='mongodb://localhost:27017'
```

# Run the App
cd email-service
```
npm run dev
```

cd user-service
```
npm run dev
```


# Dependencies
- Machine should have NodeJS and mongoDB compass