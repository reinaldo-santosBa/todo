import { SetStateAction } from 'react';
import * as Tasks from '../repositories/task';
import { attDataInScreen } from './attDataInScreen';
import { task } from '../types/task';

export const removeTask = (
    id: string,
    setTask: React.Dispatch<SetStateAction<task[]>>,
    setChecked: React.Dispatch<SetStateAction<number>>,
    setCreated: React.Dispatch<SetStateAction<number>>,
) => {
    Tasks.remove(id)
    attDataInScreen(setTask,setChecked,setCreated)
  }