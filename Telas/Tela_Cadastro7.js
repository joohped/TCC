import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro7 = ({ route, navigation }) => {
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
    comidasFavoritas,
    texturaFavorita_outro,
    texturasFavoritas } = route.params;

  const [saborFavorito_outro, setSaborFavorito_outro] = useState('');
  const [saboresFavoritos, setSaboresFavoritos] = useState({
    Salgado: false,
    Doce: false,
    Ácido: false,
    Agridoce: false
  });

  const SaboresSelecionados = (sabor) => {
    setSaboresFavoritos(prevState => ({ ...prevState, [sabor]: !prevState[sabor] }));
  };

  const CadastroParte = async () => {
    const saboresSelecionados = Object.keys(saboresFavoritos).filter(key => saboresFavoritos[key]);

    if (saboresSelecionados.length === 0){
      Alert.alert('Erro de cadastro','Escolha pelo menos uma, a que mais te agrada dentre as opções');
      return;
    }
    if (saborFavorito_outro === ""){
      setSaborFavorito_outro('não informou');
    }
    navigation.navigate('Tela_Cadastro8', {
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
        saboresFavoritos: saboresSelecionados.join(', ')
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
        source={require('../img/fundo_cadastro9.jpg')} 
        style={styles.imagemFundo}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
              Quais sabores você prefere ?
            </Text>
          </View>
          {Object.keys(saboresFavoritos).map(sabor => (
            <TouchableOpacity
            key={sabor}
            style={styles.containerCheckBox}
            onPress={() => SaboresSelecionados(sabor)}
          >
              <Checkbox
                value={saboresFavoritos[sabor]}
                onValueChange={() => SaboresSelecionados(sabor)}
                color={saboresFavoritos[sabor] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.estiloTextoCheckBox}>
                {sabor.charAt(0).toUpperCase() + sabor.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.botaoCentralizado}>
              <TextInput
                style={styles.input}
                value={saborFavorito_outro}
                onChangeText={setSaborFavorito_outro}
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
    marginBottom: 5,
    fontFamily: 'QuickDelight',
    textAlign: 'center',
  },
  subir: {
    marginBottom: 470,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    marginTop: -2,
    marginLeft: 50,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    fontFamily: 'QuickDelight',
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

export default Tela_Cadastro7;