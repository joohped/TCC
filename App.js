
import React from 'react';
import { StyleSheet } from 'react-native';
import Rotas from './Rotas';

export default function App() {
  return (
    <Rotas />
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