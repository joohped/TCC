import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function InicioQuiz({ navigation }) {

    const route = useRoute();
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
        deficiencia,
        deficiencia_outro,
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
        deficiencia,
        deficiencia_outro,
        personagemEscolhido,
        scale,
        fontSize});
  };

  const Quiz = async () => {
    navigation.navigate('Quiz', { 
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
        deficiencia,
        deficiencia_outro,
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
      deficiencia,
      deficiencia_outro,
      personagemEscolhido,
      scale,
      fontSize
        });
    };

    const [fontsLoaded] = useFonts({
        SunBorn: require('../fonts/QuickDelight.otf'),
      });

  return (

    <View>
      <ImageBackground style={{ width: width , height: height+30 , top: 0 }} source={require('../img/fundoQuiz2.png')}> 

        <TouchableOpacity onPress={Voltar} style={{top: 65, left: 30,  width: 55 , height: 55 }}>
          <Image source={require('../img/voltarQuiz.png')} style={{ width: 55 , height: 55}} /> 
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
          <Text style={{ fontSize: fontSize, top: -10, textAlign: 'center', zIndex: 1000, fontFamily: 'QuickDelight', width: 250}}> Como é bom te ver por aqui, {nome_usuario}! Eu preparei uma grande aventura para nós dois. Clique em "Continuar" para a diversão começar: </Text>
          <TouchableOpacity onPress={Quiz} style={styles.buttonComecar}>
            <Text style={styles.textComecar}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  resultContainer: {
    width: 291,
    height: 265,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    left: '15%',
    top: '25%', 
    borderRadius: 60,
    shadowColor: '#000',
    elevation: 4
  },
  inicioText: {
    fontSize: 20,
    top: -10,
    textAlign: 'center',
    zIndex: 1000,
    fontFamily: 'QuickDelight', 
    fontWeight: 'bold'
  },
  buttonComecar: {
    backgroundColor: '#FFBE23',
    width: 238,
    height: 53,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: 15,
  },
  textComecar: {
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
