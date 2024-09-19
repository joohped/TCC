import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, Image, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro4 = ({ route, navigation }) => {
  const { email, senha, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia, alergia_outro } = route.params;
  const [comida_gosta, setComida_gosta] = useState('');

  const CadastroParte = async () => {
    if (comida_gosta === ""){
      Alert.alert('Erro de cadastro','Precisamos que coloque os tipos de comida que mais gosta');
      return;
    }else{
      navigation.navigate('Tela_Cadastro5', { email, senha, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia, alergia_outro , comida_gosta });
    }
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
        source={require('../img/fundo_cadastro5.jpg')} 
        style={styles.imagemmFundo}
      >
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
            isso sera muito importante para nos conhecermos melhor!
            </Text>
          </View>
        
          <View style={styles.botaoCentralizado}>
            <View style={styles.containerPicker}>
                <Picker
                selectedValue={comida_gosta}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setComida_gosta(itemValue)}
                >
                <Picker.Item label="Gosto de comer ..." value="" />
                <Picker.Item label="verduras" value="verduras" />
                <Picker.Item label="Doces" value="doces" />
                <Picker.Item label="Frutas" value="frutas" />
                <Picker.Item label="Carnes" value="carnes" />
                <Picker.Item label="Frutos do mar" value="frutos do mar" />
                </Picker>
            </View>
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
  imagemmFundo: {
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
  subir: {
    marginTop: -420,
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
  picker: {
    height: 50,
    width: 300,
    backgroundColor: '#FDCB53',
    borderRadius: 50,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center'
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
  },
  imagem: {
    width: 30,
    height: 30,
  },
  titulo: {
    marginBottom: 25,
    width: 290,
    fontFamily: 'QuickDelight',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 25,
  },
  containerPicker: {
    marginLeft: 10,
    height: 50,
    width: 300,
    backgroundColor: '#FDCB53',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Tela_Cadastro4;