import { AppRegistry } from "react-native";
import { expo } from "./app.json";
import App from "./src/App";

AppRegistry.registerComponent(expo.name, () => App);

export default App;
