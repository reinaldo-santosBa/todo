import reactotron from "../config/reactotron";
import { operation } from "../types/operation";
import { db } from "./db";

const initdatabaseOperation = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS OPERATION 
                    (
                        id BLOB PRIMARY KEY,
                        desc TEXT, 
                        values BOOLEAN DEFAULT 0
                    )
        `,
                [],
                () => {
                    reactotron.log!!('Tabela operação criada com sucesso');
                    resolve();
                },
                (error) => {
                    reactotron.error!!('Erro ao criar a tabela Operação:', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};
const dropBase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DROP TABLE OPERATION `,
                [],
                () => {
                    reactotron.log!!('Tabela operação dropada com sucesso');
                    resolve();
                },
                (error) => {
                    reactotron.error!!('Erro ao dropada a tabela operação:', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

const insert = ({ desc, id, values }: operation): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO OPERATION (id,desc,values) VALUES (?,?,?)',
                [id, desc, values],
                (_, result) => {
                    reactotron.log!!('Operação inserida com sucesso', result);
                    resolve();
                },
                (error) => {
                    reactotron.error!!('Erro ao inserir operação:', error);
                    reject(error);
                    return true;
                }
            );

        });
    });
};

const remove = (id: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    DELETE FROM
                        OPERATION
                    WHERE
                        id = ?
                `,
                [id],
                (_, result) => {
                    reactotron.log!!('Operação removida com sucesso', result);
                    resolve();
                },
                (error) => {
                    reactotron.error!!('Erro ao remover operação:', error);
                    reject(error);
                    return true;
                }
            );

        });
    });
};


export {
    initdatabaseOperation,
    dropBase,
    insert,
}