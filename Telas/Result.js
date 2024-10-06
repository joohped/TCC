import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const Result = ({ route, navigation }) => {

  const params = route.params;

  const userData = params.userData || params; 

  const {
        email,
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
        personagemEscolhido,
        fontSize,
        scale
  } = userData;

  const [personageEscolhido, setPersonageEscolhido] = useState(null);

  useEffect(() => {
    var imagem;
    
    switch (personagemEscolhido) {
      case 'personagem1':
        imagem = require('../img/circuloTommy.png');

        break;
      case 'personagem2':
        imagem = require('../img/circuloToby.png');

        break;
      case 'personagem3':
        imagem = require('../img/circuloBella.png');

        break;
      case 'personagem4':
        imagem = require('../img/circuloBob.png');

        break;
      case 'personagem5':
        imagem = require('../img/circuloBete.png');

        break;

      default:
        imagem = null;
    }

    setPersonageEscolhido(imagem);
  }, [personagemEscolhido]);

  const { score, total } = route.params;
  const message = score < 3 ? "Que pena que você acertou" : "Parabéns você acertou";
  const imageSource = score < 3 ? require('../img/fail.png') : require('../img/success.png');
  const imageStyle = score < 3 ? styles.failImage : styles.successImage;

  const Voltar = async () => {
    navigation.navigate('Tela_Home', { 
        email,
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
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Inicio = async () => {
    navigation.navigate('InicioQuiz', { 
        email,
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
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Perfil = async () => {
    navigation.navigate('Perfil', { 
      email,
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
      personagemEscolhido,
      scale,
      fontSize
        });
    };

  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: width , height: height+30 , top: 0 }} source={require('../img/fundoQuiz.png')}>

        <TouchableOpacity onPress={Voltar}>
          <Image source={require('../img/voltarQuiz.png')} style={{ width: 55 , height: 55  , top: '120%', left: 30 }} /> 
        </TouchableOpacity>

        <View style={styles.containerPersonagem}>
            <TouchableOpacity onPress={Perfil} style={{ width: 70, zIndex: 1000,   left: 310, top: 75, marginTop: -70}}>
                {personageEscolhido && (
                <Image 
                    source={personageEscolhido} 
                    style={styles.imagemPersonagem}
                />
                )}
            </TouchableOpacity>
        </View>

          <View style={styles.resultContainer}>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.resultText}>{score}/{total}!</Text>
            <Text style={styles.playAgainText}>Quer jogar novamente?</Text>

            <TouchableOpacity style={styles.button1} onPress={Inicio}>
              <Text style={styles.buttonText1}>Jogar Novamente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={Voltar}>
              <Text style={styles.buttonText2}>Voltar a tela de início</Text>
            </TouchableOpacity>
          </View>

        <Image source={imageSource} style={imageStyle} />

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  resultContainer: {
    width: 291,
    height: 240,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    left: '15%',
    top: '25%', 
    borderRadius: 60,
  },
  failImage: {
    width: 170, 
    height: 320,
    top: '31.5%',
    left: '30%',
  },
  successImage: {
    width: 355, 
    height: 330,
    top: '31%',
    left: '8%',
  },
  resultText: {
    fontSize: 20,
    top: -10,
    textAlign: 'center',
    zIndex: 1000,
    fontFamily: 'QuickDelight', 
  },
  message: {
    fontSize: 20,
    top: -10,
    textAlign: 'center',
    zIndex: 1000,
    fontFamily: 'QuickDelight', 
  },
  playAgainText: {
    fontSize: 20,
    top: -10,
    textAlign: 'center',
    fontFamily: 'QuickDelight', 
  },
  button1: {
    backgroundColor: '#FFBE23',
    width: 238,
    height: 53,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: 5,
  },
  button2: {
    backgroundColor: '#FFBE23',
    width: 238,
    height: 53,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: 15,
  },
  buttonText1: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'QuickDelight', 
    textAlign: 'center',
    top: 5
  },
  buttonText2: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'QuickDelight', 
    textAlign: 'center',
    top: 5
  },
  imagemPersonagem: {
    width: 70,
    height: 70,
    zIndex: 1000
  },
  containerPersonagem: {
    zIndex: 1000,
  }
});

export default Result;