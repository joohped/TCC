import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro9 = ({ route, navigation }) => {
  const {         email, 
    password, 
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
    navigation.navigate('Tela_Cadastro10', { 
      email, 
      password, 
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro11.jpg')} 
        style={styles.backgroundImage}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.centeredButton}>
            <Text style={styles.Titulo}>
            É uma pena! adoro esses alimentos, quais você mais evita?
            </Text>
          </View>

          {Object.keys(comidasEvita).map(comida => (
            <TouchableOpacity
            key={comida}
            style={styles.checkboxContainer}
            onPress={() => ComidasSelecionadas(comida)}
          >
              <Checkbox
                value={comidasEvita[comida]}
                onValueChange={() => ComidasSelecionadas(comida)}
                color={comidasEvita[comida] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.checkboxTextStyle}>
                {comida.charAt(0).toUpperCase() + comida.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.centeredButton}>
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
            <View style={styles.centeredButton}>
                <TouchableHighlight
                  onPress={CadastroParte}
                  style={styles.input2}
                  underlayColor="#F39C12"
                >
                  <Image source={require('../img/seta.png')} style={styles.image} />
                </TouchableHighlight>
            </View>
      </View>
    </View>
  );
};
          
const styles = StyleSheet.create({
  checkboxTextStyle: {
    color: '#FFBE23',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  Titulo: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
    width: 320,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 365,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -2,
    marginLeft: 50,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 18,
    marginTop: 15,
    
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 15,
    marginTop: 0,
  },
  image: {
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
  backgroundImage: {
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