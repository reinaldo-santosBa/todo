import { SetStateAction } from "react";
import { task } from "../types/task";
import * as Tasks from '../repositories/task';
import { attDataInScreen } from "./attDataInScreen";

export const checkedTask = (
    id: string, 
    checked: number,
    setTask: React.Dispatch<SetStateAction<task[]>>,
    setChecked: React.Dispatch<SetStateAction<number>>,
    setCreated: React.Dispatch<SetStateAction<number>>,
) => {

    let value;
    if (checked === 1) {
      value = 0;
    } else {
      value = 1
    }
    Tasks.update(id, value)
    attDataInScreen(setTask,setChecked,setCreated)
  }