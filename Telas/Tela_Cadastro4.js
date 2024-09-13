import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro4 = ({ route, navigation }) => {
  const { email, password, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia, alergia_outro } = route.params;
  const [comida_gosta, setComida_gosta] = useState('');

  const CadastroParte = async () => {
    navigation.navigate('Tela_Cadastro5', { email, password, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia, alergia_outro , comida_gosta });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro5.jpg')} 
        style={styles.backgroundImage}
      >
        <View style={styles.subir}>
          <View style={styles.centeredButton}>
            <Text style={styles.Titulo}>
            isso sera muito importante para nos conhecermos melhor!
            </Text>
          </View>
        
          <View style={styles.centeredButton}>
            <View style={styles.pickerContainer}>
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
          

          

          <View style={styles.centeredButton}>
            <TouchableHighlight
              title="Concluir Cadastro"
              onPress={CadastroParte}
              style={styles.input2}
              underlayColor="#F39C12"
            >
              <Image source={require('../img/seta.png')} style={styles.image} />
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
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
  centeredButton: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  Titulo: {
    marginBottom: 25,
    width: 290,
    textAlign: 'center',
    marginTop: 18,
    fontSize: 22,
  },
  pickerContainer: {
    marginLeft: 10,
    height: 50,
    width: 300,
    backgroundColor: '#FDCB53',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Tela_Cadastro4;