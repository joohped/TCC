import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, ImageBackground, TouchableHighlight, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');
const googleLogo = require('../img/google-logo.png');

const Tela_Cadastro1 = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [nome_r, setNome_r] = useState('');
  const [data_nasc_resp, setData_nasc_resp] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '887696697850-s3uevbgvsn1l095fn5dsbc6ui3jpm206.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('Google Login successful, ID token:', id_token);
      setEmail('Google User');
      navigation.navigate('CadastroSplash', { email, password, nome_r, data_nasc_resp });
    }
  }, [response]);

  const formatData = (nasci) => {
    const limpo = ('' + nasci).replace(/\D/g, '');
    const junto = limpo.match(/^(\d{2})(\d{2})(\d{4})$/);

    if (junto) {
      return `${junto[1]}/${junto[2]}/${junto[3]}`;
    }

    const juntoPartial = limpo.match(/^(\d{2})(\d{2})?(\d{0,4})?$/);
    if (juntoPartial) {
      return [juntoPartial[1], juntoPartial[2], juntoPartial[3]]
        .filter(Boolean)
        .join('/');
    }

    return nasci;
  };

  const Cadastro = async () => {
      navigation.navigate('CadastroSplash', { email, password, nome_r, data_nasc_resp });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.centeredButton}>
          <TouchableHighlight
              style={{marginTop: 40}}
              onPress={() => promptAsync()}
              underlayColor="#ddd" 
              disabled={!request}
            >
              <Image source={googleLogo} style={styles.image} />
            </TouchableHighlight>
          </View>
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={nome_r}
            onChangeText={setNome_r}
            placeholder="Nome do Responsável"
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={data_nasc_resp}
            onChangeText={(nasci) => setData_nasc_resp(formatData(nasci))}
            placeholder="Data de Nascimento"
            autoCapitalize="none"
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>
        <View style={styles.centeredButton}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#ffffff"
            textAlign="center"
          />
        </View>

        <View style={styles.centeredButton}>
          <TouchableHighlight title="Cadastrar" onPress={Cadastro} style={styles.input2} underlayColor="#F39C12">
            <Text style={{color: 'white', fontSize: 18}}>Criar</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.toggleText} onPress={() => navigation.navigate('Inicio')}>
          Voltar
        </Text>
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
    padding: 9,
    borderRadius: 20,
    width: 330,
    fontSize: 18,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 140,
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
    marginVertical: 10,
    marginTop: 5,
  },
  image: {
    width: 60, 
    height: 60, 
    marginBottom: 10,
  },
});

export default Tela_Cadastro1;