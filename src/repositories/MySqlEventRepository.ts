import { RecordEvent } from './../entities/RecordEvent';
import { TradeEventDTO } from './../entities/TradeEventDTO';
import { TradeEvent } from '../entities/TradeEvent';
import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize'
export class MySqlEventRepository {
    constructor() { }

    public async insertEvent(obj: RecordEvent) {
        try {
            let dto = new TradeEventDTO(obj)
            const {
                ID_CLIENT,
                EVENT_TYPE,
                REC_TYPE,
                ASSET,
                INITIAL_PRICE,
                FINAL_PRICE,
                QUANTITY,
                VALORIZATION,
                INFO,
                MOMENT
            } = dto;
            const eventTable = this.getTableDefinition(this.getDatabase());

            const response = await eventTable.create({
                ID_CLIENT,
                EVENT_TYPE,
                REC_TYPE,
                ASSET,
                INITIAL_PRICE,
                FINAL_PRICE,
                QUANTITY,
                VALORIZATION,
                INFO,
                MOMENT
            });

            console.log('\n\n PASSOU INSERT ', response);

        } catch (error) {
            console.log('\n\n####Error repository: ', error);
        }

    }

    private getDatabase(): Sequelize {
        const db = new Sequelize(
            process.env.MYSQL_DATABASE,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASSWORD,
            {
                dialect: "mysql",
                host: process.env.MYSQL_HOST,
                port: +process.env.MYSQL_PORT
            }
        );

        return db;
    }

    private getTableDefinition(db: Sequelize): ModelCtor<Model<any, any>> {
        const table = db.define('trd2022_event', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            ID_CLIENT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            EVENT_TYPE: {
                type: DataTypes.STRING,
                allowNull: false
            },
            REC_TYPE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ASSET: {
                type: DataTypes.STRING,
                allowNull: true
            },
            INITIAL_PRICE: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            FINAL_PRICE: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            INITIAL_QTY: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            FINAL_QTY: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            VALORIZATION: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            INFO: {
                type: DataTypes.STRING,
                allowNull: true
            },
            MOMENT: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, { freezeTableName: true });

        return table;
    }
}