import React from 'react';
import {DetailScreen, HomeScreen} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
