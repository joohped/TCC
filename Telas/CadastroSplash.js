
import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const CadastroSplash = ({ navigation, route }) => {
  const { email, senha, nome_r, data_nasc, data_nasc_resp } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Tela_Cadastro2', { email, senha, nome_r, data_nasc, data_nasc_resp });
    }, 3600); 

    return () => clearTimeout(timer); 
  }, [navigation, email, senha, nome_r, data_nasc]);

  return (
    <LottieView
    source={require("../splash/Tela_Splash_2.json")}
    style={{width: width+10, height: height+50, marginTop: -10}}
    autoPlay
    speed={0.75}
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