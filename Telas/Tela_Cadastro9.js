import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro9 = ({ route, navigation }) => {
  const { email, 
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
    comida_evita } = route.params;

  const [comidasEvita_outro, setcomidasEvita_outro] = useState('');
  const [comidasEvita, setcomidasEvita] = useState({
    Alface: false,
    Batata: false,
    Brócolis: false,
    Beterraba: false,
    Tomate: false,
    Cenoura: false,
  });

  const ComidasSelecionadas = (comida) => {
    setcomidasEvita(prevState => ({ ...prevState, [comida]: !prevState[comida] }));
  };

  const CadastroParte = async () => {
    const comidasSelecionadas = Object.keys(comidasEvita).filter(key => comidasEvita[key]);

    if (comidasSelecionadas.length === 0){
      Alert.alert('Erro de cadastro','Escolha pelo menos uma, a que mais te desagrada dentre as opções');
      return;
    }
    if (comidasEvita_outro === ""){
      setcomidasEvita_outro('não informou');
    }
    navigation.navigate('Tela_Cadastro10', { 
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
      comidasEvita: comidasSelecionadas.join(', '),
      comidasEvita_outro
        });
    };

    const [fontsLoaded] = useFonts({
      'QuickDelight': require('../fonts/QuickDelight.otf'),
    });
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro11.jpg')} 
        style={styles.imagemFundo}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
            É uma pena! adoro esses alimentos, quais você mais evita?
            </Text>
          </View>

          {Object.keys(comidasEvita).map(comida => (
            <TouchableOpacity
            key={comida}
            style={styles.containerCheckBox}
            onPress={() => ComidasSelecionadas(comida)}
          >
              <Checkbox
                value={comidasEvita[comida]}
                onValueChange={() => ComidasSelecionadas(comida)}
                color={comidasEvita[comida] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.estiloTextoCheckBox}>
                {comida.charAt(0).toUpperCase() + comida.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.botaoCentralizado}>
              <TextInput
                style={styles.input}
                value={comidasEvita_outro}
                onChangeText={setcomidasEvita_outro}
                placeholder="Outro..."
                autoCapitalize="none"
                placeholderTextColor="#ffffff"
                textAlign="center"
              />
            </View>
            <View style={styles.botaoCentralizado}>
                <TouchableHighlight
                  onPress={CadastroParte}
                  style={styles.input2}
                  underlayColor="#F39C12"
                >
                  <Image source={require('../img/seta.png')} style={styles.imagem} />
                </TouchableHighlight>
            </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};
          
const styles = StyleSheet.create({
  estiloTextoCheckBox: {
    color: '#FFBE23',
    fontFamily: 'QuickDelight',
    fontSize: 21,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 21,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'QuickDelight',
    width: 320,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 365,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: -2,
    marginLeft: 50,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    fontFamily: 'QuickDelight',
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 21,
    marginTop: 15,
    
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 15,
    marginTop: 0,
  },
  imagem: {
    width: 30, 
    height: 30, 
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 50,
    marginLeft: 20,
    width: 58,
    fontSize: 18,
  },
  imagemFundo: {
    marginLeft: -20,
    flex: 1,
    marginTop: -20,
    width: width+10,
    height: height+50, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
});

export default Tela_Cadastro9;