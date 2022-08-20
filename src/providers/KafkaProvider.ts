import { EachMessagePayload, Kafka } from 'kafkajs';
import eventType from '../entities/eventType';

export class KafkaProvider {

    private clientId = 'node-app';
    private brokers = ['localhost:9092'];
    private topic = 'topic-teste';

    private kafka = new Kafka({ clientId: this.clientId, brokers: this.brokers });

    constructor() { }

    public async consume(request): Promise<void> {
        // TODO: in the future the request will come with a specific value for the topic
        let response = [];
        try {
            let consumer = this.kafka.consumer({ groupId: this.clientId });
            await consumer.connect();
            console.log("\n\n####### CONSUMER CONECTOU\n")
            await consumer.subscribe({ topic: this.topic });
            await consumer.run({
                eachMessage: async (messagePayload: EachMessagePayload) => {
                    const { topic, partition, message } = messagePayload
                    const prefix = `\n\n#### ${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`)
                    console.log(`\n####### MESSAGE BUFFER`, eventType.fromBuffer(message.value))
                    response.push(message.value);
                }
            })
        } catch (error) {
            console.log('\n\n####Error no consume: ', error);
        }
    }

    public async produce() {
        const producer = this.kafka.producer();
        try {
            await producer.connect();
            console.log("\n\n####### PRODUCER CONECTOU\n")

            for (let i = 0; i < 4; i++) {
                const example =
                {
                    event: 'BUY', asset: 'BITCOIN '+ i, initial_price: 1111.2231, timestamp: new Date().toUTCString(),
                    rec_type: 'MINUTE', final_price: 222222.2231, initial_qty: 33333.3333, final_qty: 4444.444, valorization: 55, client_id: 1
                }
                // await producer.send({ topic: this.topic, messages: [{ key: '' + i, value: 'MENSAGEM NUMERO PA ' + i } ] });
                await producer.send({ topic: this.topic, messages: [{ key: '' + i, value: eventType.toBuffer(example) }] });

                console.log("\n###### mensagens enviadas " + i);
            }
        } catch (error) {
            console.log('Error no produce: ', error);
        }
    }
}
