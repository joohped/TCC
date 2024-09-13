import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight } from 'react-native';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro2 = ({ route, navigation }) => {
  const { email, password, nome_r, data_nasc_resp } = route.params;
  const [nome_usuario, setNome_usuario] = useState('');

  const CadastroParte = async () => {
      navigation.navigate('Tela_Cadastro3', { email, password, nome_r, nome_usuario, data_nasc_resp });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro2.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={nome_usuario}
            onChangeText={setNome_usuario}
            placeholder="Nome de Usuário"
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>


        <View style={styles.centeredButton}>
          <TouchableHighlight title="Concluir Cadastro" onPress={CadastroParte} style={styles.input2} underlayColor="#F39C12">
          <Image source={require('../img/seta.png')} style={styles.image} />
          </TouchableHighlight>
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
    marginTop: -160,
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 18,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 50,
    marginTop: -100,
    width: 58,
    fontSize: 18,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 18,
    marginLeft: -260,
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 0,
    marginTop: 5,
  },
  image: {
    width: 30, 
    height: 30, 
  },
});

export default Tela_Cadastro2;