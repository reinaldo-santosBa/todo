import React, { SetStateAction } from "react";
import { TextInput } from "react-native";
import { styles } from "../styles";
interface IProps {
    taskDesc: string;
    setTaskDesc: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<IProps> = ({taskDesc,setTaskDesc}) => {
    return (
        <TextInput
            value={taskDesc}
            onChangeText={setTaskDesc}
            style={styles.textInput}
            placeholder='Adicione uma nova tarefa'
            placeholderTextColor="#808080"
        />
    )
}