import { SetStateAction } from 'react';
import * as Tasks from '../repositories/task';
import { task } from '../types/task';

export const attDataInScreen = (
    setTask: React.Dispatch<SetStateAction<task[]>>,
    setChecked: React.Dispatch<SetStateAction<number>>,
    setCreated: React.Dispatch<SetStateAction<number>>,
) => {
    Tasks.select()
        .then((result: any) => {
            return setTask(result);
        })
        .catch((error) => {
            console.error(error)
        })
    Tasks.selectChecked()
        .then((result: any) => {
            setChecked(result[0].TOTAL);
        })
        .catch((error) => {
            console.error(error)
        })
    Tasks.selectTotal()
        .then((result: any) => {
            setCreated(result[0].TOTAL);
        })
        .catch((error) => {
            console.error(error)
        })
}