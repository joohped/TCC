import React, { useState } from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, TouchableHighlight, TouchableOpacity, Image, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';


const { width, height } = Dimensions.get('window');




const Tela_Alergia = ({ route, navigation }) => {
  const { email, senha, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua } = route.params;
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

    if (alergia_outro === ""){
      setAlergia_outro('não informou');
    }
    
    navigation.navigate('Tela_Cadastro4', {
      email,
      senha,
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
        source={require('../img/fundo_cadastro4.jpg')} 
        style={styles.imagemFundo}
      ></ImageBackground>
      <View style={styles.subir}>
        <Text style={styles.titulo}>Poderia me informar suas alergias:</Text>
        {Object.keys(alergias).map((alergia) => (
          <TouchableOpacity
          key={alergia}
          style={styles.containerCheckBox}
          onPress={() => AlergiasSelecionadas(alergia)}
        >
            <Checkbox
              value={alergias[alergia]}
              onValueChange={() => AlergiasSelecionadas(alergia)}
              color={alergias[alergia] ? '#00FF00' : '#FF0000'}
            />
            <Text style={styles.estiloTextoCheckBox}>
              {alergia.charAt(0).toUpperCase() + alergia.slice(1).replace('_do_', ' do ')}
            </Text>
        </TouchableOpacity>
        ))}
        
          <View style={styles.botaoCentralizado}>
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
          <View style={styles.botaoCentralizado}>
              <TouchableHighlight
                onPress={Salvar}
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
    fontSize: 22,
    left: 5,
    marginBottom: 12,
    fontFamily: 'QuickDelight',
    textAlign: 'center',
  },
  subir: {
    marginBottom: 390,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    marginTop: -2,
    marginLeft: 55,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    fontFamily: 'QuickDelight',
    borderRadius: 20,
    width: 300,
    fontSize: 20,
    marginLeft: 15,
    marginTop: 15,
    
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 10,
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
    marginLeft: 25,
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

export default Tela_Alergia;