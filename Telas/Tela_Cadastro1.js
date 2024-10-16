import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, ImageBackground, TouchableHighlight, Alert, Linking, TouchableOpacity, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');


const Tela_Cadastro1 = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [nome_r, setNome_r] = useState('');
  const [data_nasc_resp, setData_nasc_resp] = useState('');
  const [senha, setSenha] = useState('');
  const [checked, setChecked] = useState(false);



  const Abrir_Link = () => {
    Linking.openURL("https://drive.google.com/file/d/15eQzcm70hyE9OmPwYvxA4qr36mzOduPD/view?usp=drive_link");
  };

  const validar = (email) => {
      const dominios = /^[\w-\.]+@(gmail\.com|hotmail\.com|yahoo\.com|outllook\.com)$/;
      return dominios.test(email);
  };
  

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
  const Concordou = () => {
    setChecked(prevChecked => !prevChecked);
  };

  const Cadastro = async () => {

    try {
      if (nome_r === "") {
        Alert.alert('Erro de cadastro','Coloque o Nome do Responsável');
        return;
      }
      if (email === "" ) {
        Alert.alert('Erro de cadastro','Coloque o Email');
        return;
      }
      if (!validar(email)) {
        Alert.alert('Erro de cadastro','Coloque um Email válido, \n@gmail.com | @hotmail.com | @outlook.com | @yahoo.com');
        return;
      }
      if (data_nasc_resp === "") {
        Alert.alert('Erro de cadastro','Coloque a Data de Nascimento do Responsável');
        return;
      }
      if (senha === "" ) {
        Alert.alert('Erro de cadastro','Coloque a Senha');
        return;
      }
      if (senha.length < 7) {
        Alert.alert('Erro de cadastro','Coloque uma senha maior que 6 dígitos');
        return;
      }
      if (!checked) {
        Alert.alert('Erro de cadastro','Precisa-se que aceite os termos de uso');
        return;
      }else {
        navigation.navigate('CadastroSplash', { email, senha, nome_r, data_nasc_resp });
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    };
      
  };
  
  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const MostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../img/fundo_cadastro.jpg')}
          style={styles.imagemmFundo}
        >
          <View style={styles.botaoCentralizado2}>
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
          <View style={styles.botaoCentralizado}>
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
          <View style={styles.botaoCentralizado}>
            <TextInput
              style={styles.input}
              value={data_nasc_resp}
              onChangeText={(nasci) => setData_nasc_resp(formatData(nasci))}
              placeholder="Data de Nascimento (responsável)"
              maxLength={10}
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              textAlign="center"
              keyboardType="numeric" 
            />
            
          </View>
          <View style={styles.botaoCentralizado4}>
          <View style={styles.botaoCentralizado3}>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              autoCapitalize="none"
              secureTextEntry={!mostrarSenha}
              placeholder="Senha"
              placeholderTextColor="#ffffff"
              textAlign="center"
            />
            <TouchableOpacity onPress={MostrarSenha} style={{padding: -10, marginLeft: -22, left: -15}}>
              <Icon name={mostrarSenha ? "visibility-off" : "visibility"} size={22} left={-5} />
            </TouchableOpacity>
          </View>
          </View>

          <View style={styles.botaoCentralizado}>
            <TouchableHighlight title="Cadastrar" onPress={Cadastro} style={styles.input2} underlayColor="#F39C12">
              <Text style={{color: 'white', fontSize: 21, fontFamily: 'QuickDelight'}}>Criar</Text>
            </TouchableHighlight>
          </View>

            <TouchableOpacity
            style={styles.containerCheckBox2}
            onPress={Concordou}
          >
            <Checkbox
              value={checked}
              onValueChange={Concordou}
              color={checked ? '#00FF00' : '#FF0000'}
            />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.containerCheckBox}
            onPress={Abrir_Link}
          >
            <Text style={styles.estiloTextoCheckBox}>
              Aceito e concordo com todos os termos de uso do aplicativo Nhac
            </Text>
            </TouchableOpacity>
        


          <Text style={styles.textoVoltar} onPress={() => navigation.navigate('Inicio')}>
            Voltar
          </Text>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imagemmFundo: {
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
    fontFamily: 'QuickDelight',
    borderRadius: 20,
    width: 330,
    fontSize: 21,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 140,
    fontSize: 18,
  },
  textoVoltar: {
    color: '#3498db',
    textAlign: 'center',
    width: 100,
    marginTop: 18,
    fontFamily: 'QuickDelight',
    fontSize: 24,
    marginLeft: 26,
  },
  botaoCentralizado: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
  },
  botaoCentralizado2: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 40,

  },
  botaoCentralizado3: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10,
    flexDirection:'row'
  },
  botaoCentralizado4: {
    alignItems: 'center',
  },
  imagem: {
    width: 60, 
    height: 60, 
    marginBottom: 10,
  },
  estiloTextoCheckBox: {
    color: 'red',
    fontFamily: 'QuickDelight',
    display: 'flex',
    flexDirection: 'row',
    top: 6,
    fontSize: 19,
    height: 50,
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    width: 320,
    height: 40,
    marginTop: -10,
    left: 80,
  },
  containerCheckBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    width: 25,
    top: 30,
    marginLeft: 50,
  },
});

export default Tela_Cadastro1;