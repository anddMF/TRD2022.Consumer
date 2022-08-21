import { KafkaProvider } from './providers/KafkaProvider';

const provider = new KafkaProvider();

provider.produce().catch((err) => {
    console.error("\n\n###### Error no produce INDEX: ", err);
});
