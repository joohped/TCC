import React, { useState } from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, TouchableHighlight, TouchableOpacity, Image, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';


const { width, height } = Dimensions.get('window');


const Tela_Alergia = ({ route, navigation }) => {
  const { email, password, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua } = route.params;
  const [alergia_outro, setAlergia_outro] = useState('');
  const [alergias, setAlergias] = useState( {
    Gluten: false,
    Lactose: false,
    Amendoim: false,
    Frutos_do_mar: false,
    Soja: false,
    Ovo: false,
    Castanhas: false,
  });

  const Salvar = () => {
    const Selecionadas = Object.keys(alergias).filter(key => alergias[key]);
    navigation.navigate('Tela_Cadastro4', {
      email,
      password,
      nome_r,
      nome_usuario,
      data_nasc_resp,
      data_nasc_usua,
      alergia_outro,
      alergia: Selecionadas.join(', ')
    });
  };
  const AlergiasSelecionadas = (alergia) => {
    setAlergias(prevState => ({ ...prevState, [alergia]: !prevState[alergia] }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro4.jpg')} 
        style={styles.backgroundImage}
      ></ImageBackground>
      <View style={styles.subir}>
        <Text style={styles.title}>Poderia me informar suas alergias:</Text>
        {Object.keys(alergias).map((alergia) => (
          <TouchableOpacity
          key={alergia}
          style={styles.checkboxContainer}
          onPress={() => AlergiasSelecionadas(alergia)}
        >
            <Checkbox
              value={alergias[alergia]}
              onValueChange={() => AlergiasSelecionadas(alergia)}
              color={alergias[alergia] ? '#00FF00' : '#FF0000'}
            />
            <Text style={styles.checkboxTextStyle}>
              {alergia.charAt(0).toUpperCase() + alergia.slice(1).replace('_', ' ')}
            </Text>
        </TouchableOpacity>
        ))}
        
          <View style={styles.centeredButton}>
            <TextInput
              style={styles.input}
              value={alergia_outro}
              onChangeText={setAlergia_outro}
              placeholder="Outro..."
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              textAlign="center"
            />
          </View>
          <View style={styles.centeredButton}>
              <TouchableHighlight
                onPress={Salvar}
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
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  subir: {
    marginBottom: 390,
  },
  checkboxContainer: {
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
    borderRadius: 20,
    width: 300,
    fontSize: 18,
    marginTop: 15,
    
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 10,
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

export default Tela_Alergia;