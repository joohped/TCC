import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro6 = ({ route, navigation }) => {
  const {    email, 
    password, 
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
    navigation.navigate('Tela_Cadastro7', {
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
        texturasFavoritas: texturasSelecionadas.join(', ')
        });
    };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro8.jpg')} 
        style={styles.backgroundImage}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.centeredButton}>
            <Text style={styles.Titulo}>
              Quais texturas você prefere ?
            </Text>
          </View>

          {Object.keys(texturasFavoritas).map(textura => (
            <TouchableOpacity
            key={textura}
            style={styles.checkboxContainer}
            onPress={() => TexturasSelecionadas(textura)}
          >
              <Checkbox
                value={texturasFavoritas[textura]}
                onValueChange={() => TexturasSelecionadas(textura)}
                color={texturasFavoritas[textura] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.checkboxTextStyle}>
                {textura.charAt(0).toUpperCase() + textura.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.centeredButton}>
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
    marginBottom: 4,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 410,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    marginVertical: 12,
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

export default Tela_Cadastro6;