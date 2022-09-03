import avro from 'avsc';

export default avro.Type.forSchema({
    type: 'record',
    name: 'Event',
    fields: [
        {
            name: 'event_type',
            type: { type: 'enum', name: 'EventType', symbols: ['BUY', 'SELL', 'INFO', 'ERROR'] }
        },
        {
            name: 'rec_type',
            type: { type: 'enum', name: 'RecommendationType', symbols: ['DAY', 'HOUR', 'MINUTE'] }
        },
        { name: 'asset', type: 'string' },
        { name: 'initial_price', type: 'double' },
        { name: 'final_price', type: 'double' },
        { name: 'quantity', type: 'double' },
        { name: 'valorization', default: null, type: ['null', 'double'] },
        { name: 'timestamp', type: 'string' },
        { name: 'client_id', type: 'int' },
        { name: 'message', default: null, type: ['null', 'string'] }
    ]
});


