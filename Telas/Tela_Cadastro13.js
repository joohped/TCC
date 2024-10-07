import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Tela_Cadastro13 = ({ route, navigation }) => {
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
    

  const [deficiencia_outro, setDeficiencia_outro] = useState('');
  const [deficiencias, setDeficiencias] = useState({
    Visual: false,
    Auditiva: false,
    Física: false,
    Intelectual: false
  });

  const DeficienciasSelecionadas = (def) => {
    setDeficiencias(prevState => ({ ...prevState, [def]: !prevState[def] }));
  };

  const CadastroParte = async () => {
    const deficienciasSelecionados = Object.keys(deficiencias).filter(key => deficiencias[key]);

    if (deficiencia_outro === ""){
        setDeficiencia_outro('não informou');
    }
    navigation.navigate('Tela_Cadastro14', {
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
        saboresEvita_outro,
        deficiencia_outro,
        deficiencia: deficienciasSelecionados.join(', ')
        });
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
        style={styles.imagemFundo}
      ></ImageBackground>
        <View style={styles.subir}>
          <View style={styles.botaoCentralizado}>
            <Text style={styles.titulo}>
            Qual o seu tipo de Deficiência ?
            </Text>
          </View>

          {Object.keys(deficiencias).map(def => (
            <TouchableOpacity
            key={def}
            style={styles.containerCheckBox}
            onPress={() => DeficienciasSelecionadas(def)}
          >
              <Checkbox
                value={deficiencias[def]}
                onValueChange={() => DeficienciasSelecionadas(def)}
                color={deficiencias[def] ? '#00FF00' : '#FF0000'}
              />
              <Text style={styles.estiloTextoCheckBox}>
                {def.charAt(0).toUpperCase() + def.slice(1).replace('_', ' ')}
              </Text>
          </TouchableOpacity>
          ))}
          
            <View style={styles.botaoCentralizado}>
              <TextInput
                style={styles.input}
                value={deficiencia_outro}
                onChangeText={setDeficiencia_outro}
                placeholder="outra... / alguma observação"
                autoCapitalize="none"
                placeholderTextColor="#ffffff"
                textAlign="center"
              />
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
    </View>
  );
};
          
    const styles = StyleSheet.create({
      estiloTextoCheckBox: {
        color: '#FFBE23',
        fontSize: 21,
        fontFamily: 'QuickDelight',
        marginLeft: 10,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
      },
      titulo: {
        fontSize: 21,
        marginBottom: 5,
        fontFamily: 'QuickDelight',
        textAlign: 'center',
      },
      subir: {
        marginBottom: 470,
      },
      containerCheckBox: {
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
        fontFamily: 'QuickDelight',
        borderRadius: 20,
        width: 300,
        fontSize: 21,
        marginTop: 15,
        
      },
      botaoCentralizado: {
        alignItems: 'center',
        marginVertical: 12,
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
        marginLeft: 20,
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

export default Tela_Cadastro13;