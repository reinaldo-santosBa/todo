import * as SQLite from 'expo-sqlite';
interface task {
    id: string;
    desc: string;
    checked: number;
    synchronized: number;
}

const db = SQLite.openDatabase('bd.db');

const initdatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS TASKS 
                    (
                        id BLOB PRIMARY KEY,
                        desc TEXT, 
                        checked BOOLEAN DEFAULT 0,
                        synchronized BOOLEAN DEFAULT 0
                    )
        `,
                [],
                () => {
                    console.log('Tabela criada com sucesso');
                    resolve();
                },
                (error) => {
                    console.error('Erro ao criar a tabela:', error);
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
                `DROP TABLE TASKS `,
                [],
                () => {
                    console.log('Tabela dropada com sucesso');
                    resolve();
                },
                (error) => {
                    console.error('Erro ao dropada a tabela:', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

const insert = ({ desc, id,synchronized }: task): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO TASKS (id,desc,synchronized) VALUES (?,?,?)',
                [id, desc,synchronized],
                (_, result) => {
                    console.log('Tarefa inserida com sucesso', result);
                    resolve();
                },
                (error) => {
                    console.error('Erro ao inserir tasks:', error);
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
                        TASKS
                    WHERE
                        id = ?
                `,
                [id],
                (_, result) => {
                    console.log('Tarefa removida com sucesso', result);
                    resolve();
                },
                (error) => {
                    console.error('Erro ao remover tasks:', error);
                    reject(error);
                    return true;
                }
            );

        });
    });
};

const update = (id: string,value: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                UPDATE
                    TASKS
                SET 
                    checked = ?
                WHERE 
                    id = ?
            `,
                [value,id],
                (_, result) => {
                    console.log('Update feito com sucesso', result);
                    resolve();

                },
                (error) => {
                    console.error('Erro ao fazer update de tasks id :' + id, error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};


const select = () => {
    return new Promise<{
        id: number;
        desc: string;
        checked: boolean;
        synchronized: number;
    }[]>(
        (resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM TASKS',
                    [],
                    (_, { rows }) => {
                        const tasks = rows._array;
                        resolve(tasks);
                    },
                    (error) => {
                        console.error('Erro ao selecionar as tasks:', error);
                        reject(error);
                        return true;
                    }
                );
            });
        }
    );
};

const selectChecked = () => {
    return new Promise<{
        id: number;
        desc: string;
        checked: boolean;
    }[]>(
        (resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) as TOTAL FROM TASKS WHERE checked = 1',
                    [],
                    (_, { rows }) => {
                        const tasks = rows._array;
                        resolve(tasks);
                    },
                    (error) => {
                        console.error('Erro ao selecionar as tasks:', error);
                        reject(error);
                        return true;
                    }
                );
            });
        }
    );
};

const selectTotal = () => {
    return new Promise<{
        id: number;
        desc: string;
        checked: boolean;
    }[]>(
        (resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) as TOTAL FROM TASKS',
                    [],
                    (_, { rows }) => {
                        const tasks = rows._array;
                        resolve(tasks);
                    },
                    (error) => {
                        console.error('Erro ao selecionar as tasks:', error);
                        reject(error);
                        return true;
                    }
                );
            });
        }
    );
};

export {
    initdatabase,
    insert,
    remove,
    update,
    select,
    dropBase,
    selectChecked,
    selectTotal
}