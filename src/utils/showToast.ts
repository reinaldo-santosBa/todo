import Toast from "react-native-toast-message";

export const showToast = () => {
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