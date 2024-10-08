import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Text, Alert, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro3 = ({ route, navigation }) => {
  const { email, senha, nome_r, data_nasc_resp, nome_usuario } = route.params;
  const [data_nasc_usua, setData_nasc_usua] = useState('');
  const [alergia, setAlergia] = useState('');
  const [alergia_outro, setAlergia_outro] = useState('');

  const formatDate = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);

    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }

    const matchPartial = cleaned.match(/^(\d{2})(\d{2})?(\d{0,4})?$/);
    if (matchPartial) {
      return [matchPartial[1], matchPartial[2], matchPartial[3]]
        .filter(Boolean)
        .join('/');
    }

    return text;
  };

  const CadastroParte = async () => {
    if (data_nasc_usua === ""){
      Alert.alert('Erro de cadastro','Precisamos que coloque a data de nascimento da pessoa com seletividade');
      return;
    }
    if (alergia === ""){
      Alert.alert('Erro de cadastro','Informe se tem alergia ou não');
      return;
    }
    
    if (alergia === 'sim') {
      navigation.navigate('Tela_Alergia', { email, senha, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua });
    }
    if (alergia === 'não') {
      setAlergia('não tem');
      setAlergia_outro(null);
      navigation.navigate('Tela_Cadastro4', { email, senha, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia: alergia === 'não' ? 'não tem':alergia, alergia_outro });
    }
 
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
        style={styles.imagemmFundo}
      >
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
              Muito prazer {nome_usuario}!! preciso de algumas informações que você deve preencher com um responsável tá?
            </Text>
          </View>

          <View style={styles.botaoCentralizado}>
            <TextInput
              style={styles.input}
              value={data_nasc_usua}
              onChangeText={(text) => setData_nasc_usua(formatDate(text))}
              maxLength={10}
              placeholder="Data de Nascimento"
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              textAlign="center"
              keyboardType="numeric" 
            />
          </View>

          <View style={styles.botaoCentralizado}>
            <View style={styles.containerPicker}>
              <Picker
                selectedValue={alergia}
                style={styles.picker}
                onValueChange={(itemValue) => setAlergia(itemValue)}
              >
                <Picker.Item label="Tem alergia?" value="" />
                <Picker.Item label="Sim" value="sim" />
                <Picker.Item label="Não" value="não" />
              </Picker>
            </View>
          </View>

          <View style={styles.botaoCentralizado}>
            <TouchableHighlight
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
  subir: {
    marginTop: -320,
  },
  input: {
    marginLeft: 10,
    alignItems: 'center',
    fontFamily: 'QuickDelight',
    backgroundColor: '#FDCB53',
    padding: 12,
    borderRadius: 20,
    width: 300,
    fontSize: 21,
  },
  input2: {
    alignItems: 'center',
    backgroundColor: '#FDCB53', 
    padding: 12,
    borderRadius: 50,
    marginTop: 10,
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
    marginVertical: 5,
    marginTop: 10,
  },
  containerPicker: {
    marginLeft: 10,
    height: Platform.OS === 'ios' ? 95 : 50,
    width: 300,
    backgroundColor: '#FDCB53',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imagem: {
    width: 30, 
    height: 30, 
  },
  titulo: {
    fontFamily: 'QuickDelight',
    marginBottom: 10,
    width: 290,
    textAlign: 'center',
    marginTop: 25,
    fontSize: 21,
  },
});

export default Tela_Cadastro3;
