import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';

import uuid from 'react-native-uuid';
import { styles } from './styles';
import Toast from 'react-native-toast-message';
import * as Tasks from './db/db';
interface task {
  id: string;
  desc: string;
  checked: number;
  synchronized: number;
}

const App: React.FC = () => {
  const [checked, setChecked] = useState(0);
  const [created, setCreated] = useState(0);
  const [taskDesc, setTaskDesc] = useState('');
  const [task, setTask] = useState<task[]>([]);
  const [netChecked, setNetChecked] = useState(false)
  const attDataInScreen = () => {
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
  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  useEffect(() => {
    (
      async () => {
        //Tasks.dropBase()
        Tasks.initdatabase()
          .then(() => {
            attDataInScreen()
          })
          .catch((error) => {
            console.error(error)
          })
      }
    )()
  }, [])

  const showToast = () => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Escreva uma descrição para a task',
      text2: '',
      visibilityTime: 4000, // Duração em milissegundos
      autoHide: true,
       // Ocultar automaticamente
    });
  };

  const addTask = async (taskNew: task) => {
    if (taskNew.desc === '') {
      showToast()
      return
    }
    console.log('====================================');
    console.log(await checkInternetConnection());
    console.log('====================================');
    if(await checkInternetConnection()){
      taskNew.synchronized = 1
    }
    Tasks.insert(taskNew)
    setTaskDesc('')
    attDataInScreen()
  }
  const checkedTask = (id: string, checked: number) => {

    let value;
    if (checked === 1) {
      value = 0;
    } else {
      value = 1
    }
    Tasks.update(id, value)
    attDataInScreen()
  }
  const removeTask = (id: string) => {
    Tasks.remove(id)
    attDataInScreen()
  }
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Image source={require('./assets/Logo.png')} />
        <View style={styles.areaInput}>
          <TextInput
            value={taskDesc}
            onChangeText={setTaskDesc}
            style={styles.textInput}
            placeholder='Adicione uma nova tarefa'
            placeholderTextColor="#808080"
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addTask({
                id: uuid.v4().toString(),
                desc: taskDesc,
                checked: 0,
                synchronized: 0
              })
            }}
          >
            <IconAntDesign name="pluscircleo" size={16} color="#FFF" />
          </TouchableOpacity>
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
                  console.log('====================================');
                  console.log(item.item);
                  console.log('====================================');
                  return (<View style={styles.cardTask}>
                    <TouchableOpacity
                      onPress={
                        () => {
                          checkedTask(item.item.id, item.item.checked)
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
                      onPress={() => removeTask(item.item.id)}
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
