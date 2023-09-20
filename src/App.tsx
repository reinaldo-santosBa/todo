import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';
import Toast from 'react-native-toast-message';
import * as Tasks from './repositories/task';
import reactotron from './config/reactotron';
import { attDataInScreen } from './utils/attDataInScreen';
import { checkedTask } from './utils/checked';
import { removeTask } from './utils/remove';
import { Input } from './components/input';
import { ButtonAdd } from './components/buttonAdd';
import { task } from './types/task';

if (__DEV__) reactotron.connect()

const App: React.FC = () => {
  const [checked, setChecked] = useState(0);
  const [created, setCreated] = useState(0);
  const [taskDesc, setTaskDesc] = useState('');
  const [task, setTask] = useState<task[]>([]);

  useEffect(() => {
    (
      async () => {
        //Tasks.dropBase()
        Tasks.initdatabase()
          .then(() => {
            attDataInScreen(setTask, setChecked, setCreated)
          })
          .catch((error) => {
            console.error(error)
          })
      }
    )()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Image source={require('./assets/Logo.png')} />
        <View style={styles.areaInput}>
          <Input
            taskDesc={taskDesc}
            setTaskDesc={setTaskDesc}
          />
          <ButtonAdd
            taskDesc={taskDesc}
            setTaskDesc={setTaskDesc}
            setTask={setTask}
            setChecked={setChecked}
            setCreated={setCreated}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.areaIndicator}>
          <View style={styles.indicator}>
            <Text style={styles.title}>
              Criadas
            </Text>
            <Text style={styles.subTitle}>
              {created}
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text style={styles.title}>
              Concluidas
            </Text>
            <Text style={styles.subTitle}>
              {checked}
            </Text>
          </View>
        </View>
        {
          task.length > 0
            ? <FlatList
              style={styles.listTask}
              data={task}
              ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
              renderItem={
                (item) => {
                  return (<View style={styles.cardTask}>
                    <TouchableOpacity
                      onPress={
                        () => {
                          checkedTask(
                            item.item.id,
                            item.item.checked,
                            setTask,
                            setChecked,
                            setCreated
                          )
                        }
                      }
                      style={
                        item.item.checked === 1
                          ? styles.circleChecked
                          : styles.circleNotChecked
                      }
                    >
                      {
                        item.item.checked
                          ? <IconFontAwesome name="check" size={15} color="#ccc" />
                          : <></>
                      }

                    </TouchableOpacity>
                    <Text style={styles.textDesc}>
                      {item.item.desc} - {item.item.synchronized}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        removeTask(
                          item.item.id,
                          setTask,
                          setChecked,
                          setCreated
                        )
                      }}
                    >
                      <IconFontAwesome
                        name="trash-alt"
                        size={25}
                        color="#ccc"
                      />
                    </TouchableOpacity>
                  </View>
                  )
                }
              }
            />
            : <View style={styles.listEmpty}>
              <Image
                source={require('./assets/Clipboard.png')}
              />
              <Text style={styles.textListEmptyMain}>
                Você ainda não tem tarefas cadastradas
              </Text>
              <Text style={styles.textListEmpty}>
                Crie tarefas e organize seus itens a fazer
              </Text>
            </View>
        }
      </View>
      <Toast />

    </View>
  );
}
export default App;
