import React, { SetStateAction } from "react";
import * as Tasks from '../repositories/task';
import { checkInternetConnection } from "./checkConnection";
import { showToast } from "./showToast";
import { attDataInScreen } from "./attDataInScreen";
import { task } from "../types/task";



export const addTask = async (
    taskNew: task,
    setTaskDesc: React.Dispatch<SetStateAction<string>>,
    setTask: React.Dispatch<SetStateAction<task[]>>,
    setChecked: React.Dispatch<SetStateAction<number>>,
    setCreated: React.Dispatch<SetStateAction<number>>
) => {
    if (taskNew.desc === '') {
      showToast()
      return
    }

    if(await checkInternetConnection()){
      taskNew.synchronized = 1
    }
    Tasks.insert(taskNew)
    setTaskDesc('')
    attDataInScreen(setTask,setChecked,setCreated)
  }
