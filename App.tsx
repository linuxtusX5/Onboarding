import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import HomeScreen from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/components/OnboardingScreen';

const stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name='OnboardingScreen' component={Onboarding}/>
        <stack.Screen name='HomeScreen' component={Tabs}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
