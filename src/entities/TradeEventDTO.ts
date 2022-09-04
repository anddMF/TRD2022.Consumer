import { RecordEvent } from './RecordEvent';
import { EventType, RecommendationType } from './TradeEvent';

export class TradeEventDTO {
    public ID: number;
    public ID_CLIENT: number;
    public EVENT_TYPE: EventType;
    public REC_TYPE: RecommendationType;
    public ASSET: string;
    public INITIAL_PRICE: number;
    public FINAL_PRICE: number;
    public QUANTITY: number;
    public VALORIZATION: number;
    public INFO: string;
    public MOMENT: Date;

    constructor(model: RecordEvent) {
        this.ID = 0;
        this.ID_CLIENT = model.client_id;
        this.EVENT_TYPE = model.event_type;
        this.REC_TYPE = model.rec_type;
        this.ASSET = model.asset;
        this.INITIAL_PRICE = model.initial_price;
        this.FINAL_PRICE = model.final_price;
        this.QUANTITY = model.quantity;
        this.VALORIZATION = model.valorization;
        this.INFO = model.message;
        this.MOMENT = model.timestamp;
    }
}