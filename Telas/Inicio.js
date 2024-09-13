
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableHighlight } from 'react-native';

const { width, height } = Dimensions.get('window'); 

const Inicio = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../img/fundo_inicio.jpg')} 
        style={styles.backgroundImage}
      >

            <View style={styles.centeredButton}>
            <TouchableHighlight onPress={() => navigation.navigate('Tela_Cadastro1')} style={styles.button} underlayColor="#F39C12">
              <Text style={{color: 'white', fontSize: 18}}>Sou novo por aqui!</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.centeredButton}>
            <TouchableHighlight onPress={() => navigation.navigate('Tela_Login')} style={styles.button} underlayColor="#F39C12">
              <Text style={{color: 'white', fontSize: 18}}>Já tenho conta!</Text>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#FDCB53',
    padding: 15,
    borderRadius: 20,
    width: 280,
    marginBottom: -40,
  },
  centeredButton: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: -90,
  },
});

export default Inicio;