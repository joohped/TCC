
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Rotas from './Rotas';

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent"
        translucent={true}
      />
      <Rotas/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});