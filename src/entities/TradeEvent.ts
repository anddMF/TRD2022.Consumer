import eventType from './eventTypeAvro'

export class TradeEvent {
    public eventType: EventType;
    public recType: RecommendationType;
    public asset: string;
    public initialPrice: number;
    public finalPrice: number;
    public quantity: number;
    public valorization: number;
    public timestamp: Date;
    public clientId: number;
    public message: string;

    constructor(eventAvro?: any) {
        const { 
            event_type,
            rec_type,
            asset,
            initial_price,
            final_price,
            quantity,
            valorization,
            timestamp,
            client_id,
            message,
        } = eventAvro;

        this.eventType = event_type;
        this.recType = rec_type;
        this.asset = asset;
        this.initialPrice = initial_price;
        this.finalPrice = final_price;
        this.quantity = quantity;
        this.valorization = valorization;
        this.timestamp = timestamp;
        this.clientId = client_id;
        this.message = message;
    }

}

export enum EventType {
    BUY = 1,
    SELL = 2,
    INFO = 3,
    ERROR = 4
}

export enum RecommendationType {
    DAY = 1,
    HOUR = 2,
    MINUTE = 3
}