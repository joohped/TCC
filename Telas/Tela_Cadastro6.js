import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro6 = ({ route, navigation }) => {
  const {    email, 
    senha, 
    nome_r, 
    nome_usuario, 
    data_nasc_resp, 
    data_nasc_usua, 
    alergia, 
    alergia_outro, 
    comida_gosta,
    comidaFavorita_outro,
    comidasFavoritas } = route.params;

  const [texturaFavorita_outro, setTexturaFavorita_outro] = useState('');
  const [texturasFavoritas, setTexturasFavoritas] = useState({
    Moles: false,
    Duras: false,
    Asperas: false,
    Lisas: false,
    Gosmentas: false,
    Secas: false,
  });

  const TexturasSelecionadas = (textura) => {
    setTexturasFavoritas(prevState => ({ ...prevState, [textura]: !prevState[textura] }));
  };

  const CadastroParte = async () => {
    const texturasSelecionadas = Object.keys(texturasFavoritas).filter(key => texturasFavoritas[key]);

    if (texturasSelecionadas.length === 0){
      Alert.alert('Erro de cadastro','Escolha pelo menos uma, a que mais te agrada dentre as opções');
      return;
    }
    if (texturaFavorita_outro === ""){
      setTexturaFavorita_outro('não informou');
    }
    navigation.navigate('Tela_Cadastro7', {
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
        texturasFavoritas: texturasSelecionadas.join(', ')
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
        source={require('../img/fundo_cadastro8.jpg')} 
        style={styles.imagemFundo}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
              Quais texturas você prefere ?
            </Text>
          </View>

          {Object.keys(texturasFavoritas).map(textura => (
            <TouchableOpacity
            key={textura}
            style={styles.containerCheckBox}
            onPress={() => TexturasSelecionadas(textura)}
          >
              <Checkbox
                value={texturasFavoritas[textura]}
                onValueChange={() => TexturasSelecionadas(textura)}
                color={texturasFavoritas[textura] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.estiloTextoCheckBox}>
                {textura.charAt(0).toUpperCase() + textura.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.botaoCentralizado}>
              <TextInput
                style={styles.input}
                value={texturaFavorita_outro}
                onChangeText={setTexturaFavorita_outro}
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
    fontFamily: 'QuickDelight',
    fontSize: 21,
    marginBottom: 4,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 410,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
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
    marginVertical: 12,
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

export default Tela_Cadastro6;