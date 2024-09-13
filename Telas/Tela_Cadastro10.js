import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro10 = ({ route, navigation }) => {
  const {
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
    navigation.navigate('Tela_Cadastro11', {
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
      comidasEvita,
      comidasEvita_outro,
      texturasEvita: texturasSelecionadas.join(', '),
      texturasEvita_outro
        });
    };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro12.jpg')} 
        style={styles.backgroundImage}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.centeredButton}>
            <Text style={styles.Titulo}>
            Quais texturas você evita?
            </Text>
          </View>

          {Object.keys(texturasEvita).map(textura => (
            <TouchableOpacity
            key={textura}
            style={styles.checkboxContainer}
            onPress={() => texturasSelecionadas(textura)}
          >
              <Checkbox
                value={texturasEvita[textura]}
                onValueChange={() => texturasSelecionadas(textura)}
                color={texturasEvita[textura] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.checkboxTextStyle}>
                {textura.charAt(0).toUpperCase() + textura.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.centeredButton}>
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
    width: 320,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 412,
  },
  checkboxContainer: {
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
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 18,
    marginTop: 15,
    
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 5,
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
    marginTop: 10,
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

export default Tela_Cadastro10;