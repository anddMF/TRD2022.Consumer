import { KafkaProvider } from './providers/KafkaProvider'

const provider = new KafkaProvider();

provider.consume().catch((err) => {
    console.error("error in consumer: ", err);
});