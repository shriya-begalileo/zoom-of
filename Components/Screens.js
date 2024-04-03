import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Session from './Session';
import ZoomClass from './ZoomClass';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="ZoomClass" component={ZoomClass} />
        <Stack.Screen
          name="Session"
          component={Session}
          options={{title: 'Welcome'}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack