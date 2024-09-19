import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro10 = ({ route, navigation }) => {
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
    comidasEvita_outro } = route.params;

  const [texturasEvita_outro, setTexturasEvita_outro] = useState('');
  const [texturasEvita, setTexturasEvita] = useState({
    Moles: false,
    Duras: false,
    Asperas: false,
    Lisas: false,
    Gosmentas: false,
    Secas: false,
  });

  const texturasSelecionadas = (textura) => {
    setTexturasEvita(prevState => ({ ...prevState, [textura]: !prevState[textura] }));
  };

  const CadastroParte = async () => {
    const texturasSelecionadas = Object.keys(texturasEvita).filter(key => texturasEvita[key]);

    if (texturasSelecionadas.length === 0){
      Alert.alert('Erro de cadastro','Escolha pelo menos uma, a que mais te agrada dentre as opções');
      return;
    }
    if (texturasEvita_outro === ""){
      setTexturasEvita_outro('não informou');
    }
    navigation.navigate('Tela_Cadastro11', {
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
      texturasEvita: texturasSelecionadas.join(', '),
      texturasEvita_outro
        });
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
        source={require('../img/fundo_cadastro12.jpg')} 
        style={styles.imagemFundo}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
            Quais texturas você evita?
            </Text>
          </View>

          {Object.keys(texturasEvita).map(textura => (
            <TouchableOpacity
            key={textura}
            style={styles.containerCheckBox}
            onPress={() => texturasSelecionadas(textura)}
          >
              <Checkbox
                value={texturasEvita[textura]}
                onValueChange={() => texturasSelecionadas(textura)}
                color={texturasEvita[textura] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.estiloTextoCheckBox}>
                {textura.charAt(0).toUpperCase() + textura.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.botaoCentralizado}>
              <TextInput
                style={styles.input}
                value={texturasEvita_outro}
                onChangeText={setTexturasEvita_outro}
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
  );
};
      
const styles = StyleSheet.create({

  estiloTextoCheckBox: {
    color: '#FFBE23',
    fontSize: 21,
    fontFamily: 'QuickDelight',
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
    width: 320,
    fontFamily: 'QuickDelight',
    marginBottom: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 412,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    marginTop: -2,
    marginLeft: 50,
    borderRadius: 50,
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
    marginVertical: 5,
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
    marginTop: 10,
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

export default Tela_Cadastro10;