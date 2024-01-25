import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import io from 'socket.io-client';
import MainNavigator from './src/navigation/MainNavigator';
import {API_URL} from './src/consts/app.consts';

export const socket = io(API_URL);
socket.on('connect', () => {
  console.log('socket is connected');
});

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
