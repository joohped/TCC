import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Text, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro12 = ({ route, navigation }) => {
    const { 
        email, 
        senha, 
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
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro} = route.params;

  const [deficiencia, setDeficiencia] = useState('');
  const [deficiencia_outro, setDeficiencia_outro] = useState('');

  const CadastroParte = async () => {
    if (deficiencia === ""){
      Alert.alert('Erro de cadastro','Informe se tem algum tipo de deficiência ou não, por favor');
      return;
    }
    
    if (deficiencia === 'sim') {
      navigation.navigate('Tela_Cadastro13', { 
        email, 
        senha, 
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
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro, });
    }
    if (deficiencia === 'não') {
      setDeficiencia('não tem');
      setDeficiencia_outro(null);
      navigation.navigate('Tela_Cadastro14', { email, 
        senha, 
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
        texturasEvita,
        texturasEvita_outro,
        saboresEvita,
        saboresEvita_outro,
        deficiencia: deficiencia === 'não' ? 'não tem':deficiencia, deficiencia_outro });
    }
 
  };

  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/fundo_cadastro13.jpg')} 
        style={styles.imagemmFundo}
      >
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
              Para finalizar preciso que me responda essa última pergunta
            </Text>
          </View>

          <View style={styles.botaoCentralizado}>
            <View style={styles.containerPicker}>
              <Picker
                selectedValue={deficiencia}
                style={styles.picker}
                onValueChange={(itemValue) => setDeficiencia(itemValue)}
              >
                <Picker.Item label="Tem alguma deficiência?" value="" />
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
    marginTop: -340,
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
    marginTop: 15,
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
    marginVertical: 8,
    marginTop: 0,
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
    marginBottom: 15,
    width: 300,
    textAlign: 'center',
    marginTop: -10,
    fontSize: 21,
  },
});

export default Tela_Cadastro12;
