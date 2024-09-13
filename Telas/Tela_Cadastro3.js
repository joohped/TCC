import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro3 = ({ route, navigation }) => {
  const { email, password, nome_r, data_nasc_resp, nome_usuario } = route.params;
  const [data_nasc_usua, setData_nasc_usua] = useState('');
  const [alergia, setAlergia] = useState('');

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
    if (alergia === 'sim') {
      navigation.navigate('Tela_Alergia', { email, password, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua });
    } else {
      navigation.navigate('Tela_Cadastro4', { email, password, nome_r, nome_usuario, data_nasc_resp, data_nasc_usua, alergia });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro4.jpg')} 
        style={styles.backgroundImage}
      >
        <View style={styles.subir}>
          <View style={styles.centeredButton}>
            <Text style={styles.Titulo}>
              Muito prazer {nome_usuario}!! preciso de algumas informações que vocé deve preencher com um responsável tá?
            </Text>
          </View>

          <View style={styles.centeredButton}>
            <TextInput
              style={styles.input}
              value={data_nasc_usua}
              onChangeText={(text) => setData_nasc_usua(formatDate(text))}
              placeholder="Data de Nascimento"
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
              textAlign="center"
              keyboardType="numeric" 
              maxLength={10}
            />
          </View>

          <View style={styles.centeredButton}>
            <View style={styles.pickerContainer}>
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
  subir: {
    marginTop: -320,
  },
  input: {
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: '#FDCB53',
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
    marginTop: 20,
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
    marginVertical: 5,
    marginTop: 10,
  },
  pickerContainer: {
    marginLeft: 10,
    height: 50,
    width: 300,
    backgroundColor: '#FDCB53',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 30, 
    height: 30, 
  },
  Titulo: {
    marginBottom: 10,
    width: 290,
    textAlign: 'center',
    marginTop: 25,
    fontSize: 22,
  },
});

export default Tela_Cadastro3;
