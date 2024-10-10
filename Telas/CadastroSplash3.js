
import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const CadastroSplash3 = ({ navigation, route }) => {
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
        saboresEvita_outro,
        deficiencia,
        deficiencia_outro,
        personagemEscolhido: personagemImagem  } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Tela_Login');
    }, 3000); 

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
    saboresEvita_outro,
    deficiencia,
    deficiencia_outro,
    personagemImagem  ]);
 
  return (
    <LottieView
    source={require("../splash/Tela_Splash_2.json")}
    style={{width: width+10, height: height+55, marginTop: -15}}
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

export default CadastroSplash3;