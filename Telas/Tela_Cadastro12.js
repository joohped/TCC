import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, Image, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro12 = ({ route, navigation }) => {
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
    saboresEvita_outro} = route.params;


  const CadastroParte = async () => {
    navigation.navigate('CadastroSplash2', { 
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
      saboresEvita_outro});
  };

  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro6.jpg')} 
        style={styles.imagemFundo}
      >
        <View style={styles.desce}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
            Iremos nos conhecer melhor em breve! 
            Enquanto isso, escolha seu personagem favorito!
            </Text>
          </View>

          <View style={styles.botaoCentralizado}>
            <TouchableHighlight
              title="Concluir Cadastro"
              onPress={CadastroParte}
              style={styles.input2}
              underlayColor="#F39C12"
            >
              <Image source={require('../img/seta.png')} style={styles.imagem} />
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imagemFundo: {
    marginLeft: -20,
    flex: 1,
    marginTop: -20,
    width: width + 10,
    height: height + 50,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FCFFEE',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  desce: {
    marginTop: 155,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 50,
    marginLeft: 10,
    width: 58,
    fontSize: 18,
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 5,
  },
  imagem: {
    width: 30,
    height: 30,
  },
  titulo: {
    marginBottom: 10,
    width: 290,
    fontFamily: 'QuickDelight',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Tela_Cadastro12;