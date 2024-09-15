import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window'); 

const Inicio = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    'QuickDelight': require('../fonts/QuickDelight.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../img/fundo_inicio.jpg')} 
        style={styles.ImagemFundo}
      >

            <View style={styles.BotaoCentro}>
            <TouchableHighlight onPress={() => navigation.navigate('Tela_Cadastro1')} style={styles.botao} underlayColor="#F39C12">
              <Text style={{color: 'white', fontSize: 21, fontFamily: 'QuickDelight'}}>Sou novo por aqui!</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.BotaoCentro}>
            <TouchableHighlight onPress={() => navigation.navigate('Tela_Login')} style={styles.botao} underlayColor="#F39C12">
              <Text style={{color: 'white', fontSize: 21, fontFamily: 'QuickDelight'}}>Já tenho conta!</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    ImagemFundo: {
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
  botao: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 15,
    borderRadius: 20,
    width: 280,
    marginBottom: -40,
  },
  BotaoCentro: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: -90,
  },
});

export default Inicio;