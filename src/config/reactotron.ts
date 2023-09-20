import { NativeModules } from "react-native";
import reactotron from "reactotron-react-native";

const { scriptURL } = NativeModules.SourceCode;

const splits = scriptURL.split("://")[1]

const hostName = splits.split(":")[0]

reactotron
    .configure({host: hostName})
    .useReactNative()

export default reactotron