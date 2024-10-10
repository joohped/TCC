import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {useFonts} from 'expo-font'

const { width, height } = Dimensions.get('window');

const Tela_Cadastro2 = ({ route, navigation }) => {
  const { email, senha, nome_r, data_nasc_resp } = route.params;
  const [nome_usuario, setNome_usuario] = useState('');

  const CadastroParte = async () => {
    if (nome_usuario === "" ) {
      Alert.alert('Erro de cadastro','Coloque o nome de usuario');
      return;
    }else{
      navigation.navigate('Tela_Cadastro3', { email, senha, nome_r, nome_usuario, data_nasc_resp });
    }

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
          source={require('../img/fundo_cadastro2.jpg')}
          style={styles.backgroundimagem}
        ></ImageBackground>
          <View style={styles.botaoCentralizado}>
            <TextInput
              style={styles.input}
              value={nome_usuario}
              onChangeText={setNome_usuario}
              placeholder="Nome da criança"
              maxLength={14}
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              textAlign="center"
            />
          </View>


          <View style={styles.botaoCentralizado}>
            <TouchableHighlight title="Concluir Cadastro" onPress={CadastroParte} style={styles.input2} underlayColor="#F39C12">
            <Image source={require('../img/seta.png')} style={styles.imagem} />
            </TouchableHighlight>
          </View>

        
      </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundimagem: {
    marginLeft: -20,
    flex: 1,
    marginTop: -20,
    width: width+10,
    height: height+50, 
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
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    fontFamily: 'QuickDelight',
    marginTop: -160,
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 21,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 50,
    marginTop: -540,
    width: 58,
    fontSize: 18,
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 0,
    marginTop: 440,
  },
  imagem: {
    width: 30, 
    height: 30, 
  },
});

export default Tela_Cadastro2;