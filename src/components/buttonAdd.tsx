import { TouchableOpacity } from "react-native"
import { styles } from "../styles"
import uuid from 'react-native-uuid';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { addTask } from "../utils/add";
import { task } from "../types/task";
interface IProps {
    taskDesc: string,
    setTaskDesc: React.Dispatch<React.SetStateAction<string>>,
    setTask:React.Dispatch<React.SetStateAction<task[]>>,
    setChecked:React.Dispatch<React.SetStateAction<number>>,
    setCreated:React.Dispatch<React.SetStateAction<number>>,
}
export const ButtonAdd: React.FC<IProps> = ({
    taskDesc,
    setTaskDesc,
    setTask,
    setChecked,
    setCreated
}) => {
    return (
        <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          const newTask = {
            id: uuid.v4().toString(),
            desc: taskDesc,
            checked: 0,
            synchronized: 0
          }
          addTask(
            newTask,
            setTaskDesc,
            setTask,
            setChecked,
            setCreated
          )
        }}
      >
        <IconAntDesign name="pluscircleo" size={16} color="#FFF" />
      </TouchableOpacity>
    )
}