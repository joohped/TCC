
import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const CadastroSplash = ({ navigation, route }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Inicio');
    }, 3600); 

    return () => clearTimeout(timer); 
  });

  return (
      <LottieView
      source={require("../splash/Tela_Splash_Nhac.json")}
      style={{width: width+10, height: height+50, marginTop: -10}}
      autoPlay
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemFundo: {
    marginLeft: -20,
    flex: 1,
    marginTop: 0,
    width: width+20,
    height: height+50, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
});

export default CadastroSplash;