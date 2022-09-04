import { MySqlEventRepository } from './../repositories/MySqlEventRepository';
import { TradeEvent } from '../entities/TradeEvent';
import { EachMessagePayload, Kafka } from 'kafkajs';
import eventType from '../entities/eventTypeAvro';
import process from 'process';
import * as dotenv from 'dotenv';
import { RecordEvent } from '../entities/RecordEvent';

export class KafkaProvider {

    private clientId = '';
    private brokers = [];
    private topic = '';
    private repository: MySqlEventRepository;

    private kafka = new Kafka({ clientId: this.clientId, brokers: this.brokers });

    constructor() {
        dotenv.config();

        this.clientId = process.env.KAFKA_CLIENTID;
        this.brokers.push(process.env.KAFKA_BROKER);
        this.topic = process.env.KAFKA_TOPIC;

        this.repository = new MySqlEventRepository();
    }

    public async consume(): Promise<void> {
        // TODO: in the future the request will come with a specific value for the topic
        let response = [];
        try {
            let consumer = this.kafka.consumer({ groupId: this.clientId });
            await consumer.connect();
            console.log("\n\n####### CONSUMER CONNECTED\n")
            await consumer.subscribe({ topic: this.topic });
            await consumer.run({
                eachMessage: async (messagePayload: EachMessagePayload) => {
                    const { topic, partition, message } = messagePayload
                    const prefix = `\n\n#### ${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`)

                    var jsonObj = message.value.toString();
                    let obj = new RecordEvent();
                    obj.fillFromJSON(jsonObj);
                    
                    await this.repository.insertEvent(obj);
                }
            })
        } catch (error) {
            console.log('\n\n####Error consumer: ', error);
        }
    }

    public async produce() {
        console.log(`\n\n###### variaveis env: client ${this.clientId}; topic ${this.topic}`)
        const producer = this.kafka.producer();
        try {
            await producer.connect();
            console.log("\n\n####### PRODUCER CONNECTED\n")

            for (let i = 0; i < 4; i++) {
                const example =
                {
                    event_type: 'BUY', asset: 'BITCOIN ' + i, initial_price: 1111.2231, timestamp: new Date().toISOString(),
                    rec_type: 'MINUTE', final_price: 222222.2231, initial_qty: 33333.3333, final_qty: 4444.444, valorization: 55, client_id: 1
                }
                console.log(example)
                await producer.send({ topic: this.topic, messages: [{ key: '' + i, value: eventType.toBuffer(example) }] });

                console.log("\n###### messages sent " + i);
            }
        } catch (error) {
            console.log('Error producer: ', error);
        }
    }
}