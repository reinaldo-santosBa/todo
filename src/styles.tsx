import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
    },
    intro: {
      position: 'relative',
      flex: 2.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    areaInput: {
      width:  '100%',
      height: 54,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      bottom: -27,
      zIndex: 1,
      gap: 8,
      paddingLeft: 24,
      paddingRight: 24,
    },
    btn: {
      width: 52,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1E6F9F',
      borderRadius: 6
    },
    textInput:{
      flex:1,
      backgroundColor: '#262626',
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 6,
      fontSize: 18,
      textAlignVertical: 'center',
      fontStyle: 'normal',
      lineHeight: 40,
      color: '#808080'
    },
    content: {
      flex: 7.5, 
      backgroundColor: '#1A1A1A',
      paddingTop: 60,
      paddingLeft: 30,
      paddingRight: 30
    },
    areaIndicator: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      alignSelf: 'stretch',
    },
    indicator:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8
    },
    title:{
      color:'#4EA8DE',
      fontSize: 20,
      fontWeight: '700'
    },
    subTitle:{
      color:'#D9D9D9',
      fontSize: 16,
      fontWeight: '700',
      paddingTop:2,
      paddingBottom: 2,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 100,
      backgroundColor: '#333'
    },
    listTask:{
        marginTop:20,
    },
    listEmpty:{
        marginTop:20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 48,
        borderTopColor: '#333',
        borderTopWidth: 1,
    },
    cardTask:{
        padding: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#262626',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    textListEmptyMain: {
        marginTop: 16,
        color:'#808080',
        fontSize: 18,
        textAlign: 'center',
        width: '100%',
        fontWeight: '800'
    },
    textListEmpty:{
        color:'#808080',
        fontSize: 18,
        textAlign: 'center',
        width: '100%',
        fontWeight: '500'
    },
    circleChecked:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: '#5e60ce',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleNotChecked:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#4EA8DE'
    },
    textDesc:{
        flex:1,
        fontSize:18,
        color: '#FFFFFF',
        textAlign: 'justify'
    },
    
  });
  