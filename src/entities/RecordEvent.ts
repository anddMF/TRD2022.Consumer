import { EventType, RecommendationType } from "./TradeEvent";

export class RecordEvent {
    public event_type: EventType;
    public rec_type: RecommendationType;
    public asset: string;
    public initial_price: number;
    public final_price: number;
    public quantity: number;
    public valorization: number;
    public timestamp: Date;
    public client_id: number;
    public message: string;

    constructor(){}

    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}