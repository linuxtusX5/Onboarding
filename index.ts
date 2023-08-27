import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Correct import

import App from './App'; // Replace with the path to your App component

// Load the Ant Design icon font
AntDesign.loadFont();

// Register your app component
AppRegistry.registerComponent(appName, () => App);
