import { EventType, RecommendationType, TradeEvent } from './TradeEvent';

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

    constructor(model?: TradeEvent){
        this.ID = 0;
        this.ID_CLIENT = model.clientId;
        this.EVENT_TYPE = model.eventType;
        this.REC_TYPE = model.recType;
        this.ASSET = model.asset;
        this.INITIAL_PRICE = model.initialPrice;
        this.FINAL_PRICE = model.finalPrice;
        this.QUANTITY = model.quantity;
        this.VALORIZATION = model.valorization;
        this.INFO = model.message;
        this.MOMENT = model.timestamp;
    }
}