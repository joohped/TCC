import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const CadastroSplash2 = ({ navigation, route }) => {
  const {       
    email, 
    senha, 
    nome_r, 
    nome_usuario, 
    data_nasc_resp, 
    data_nasc_usua, 
    alergia, 
    alergia_outro, 
    comida_gosta,
    comidaFavorita_outro,
    comidasFavoritas,
    texturaFavorita_outro,
    texturasFavoritas,
    saborFavorito_outro,
    saboresFavoritos,
    comida_evita,
    comidasEvita,
    comidasEvita_outro,
    texturasEvita,
    texturasEvita_outro,
    saboresEvita,
    saboresEvita_outro } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Personagem1', {       
        email, 
        senha, 
        nome_r, 
        nome_usuario, 
        data_nasc_resp, 
        data_nasc_usua, 
        alergia, 
        alergia_outro, 
        comida_gosta,
        comidaFavorita_outro,
        comidasFavoritas,
        texturaFavorita_outro,
        texturasFavoritas,
        saborFavorito_outro,
        saboresFavoritos,
        comida_evita,
        comidasEvita,
        comidasEvita_outro,
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro });
    }, 3400); 

    return () => clearTimeout(timer); 
  }, [navigation,       
    email, 
    senha, 
    nome_r, 
    nome_usuario, 
    data_nasc_resp, 
    data_nasc_usua, 
    alergia, 
    alergia_outro, 
    comida_gosta,
    comidaFavorita_outro,
    comidasFavoritas,
    texturaFavorita_outro,
    texturasFavoritas,
    saborFavorito_outro,
    saboresFavoritos,
    comida_evita,
    comidasEvita,
    comidasEvita_outro,
    texturasEvita,
    texturasEvita_outro,
    saboresEvita,
    saboresEvita_outro]);

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

export default CadastroSplash2;